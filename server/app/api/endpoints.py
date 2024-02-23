import os
from fastapi import APIRouter, HTTPException, Depends, status, Query
import logging
import requests


from google_play_scraper import Sort, reviews
import praw
import tweepy
import csv
from openpyxl import Workbook
import pandas as pd
import json
import itertools


from enums.gsearch_info import SearchInfo
from bs4 import BeautifulSoup

from helpers.search import google_search
from helpers.remove_emoji import remove_emoji
from helpers.use_ai import request_chat_gpt_api
from helpers.prompts import NOISE_PROMPT, SENTIMENT_PROMPT, SWOT_PROMPT

import dotenv

dotenv.load_dotenv()

GITHUB_PAT = os.getenv("GITHUB_PAT")
CLIENT_ID = os.getenv("REDDIT_CLIENT_ID")
CLIENT_SECRET = os.getenv("REDDIT_CLIENT_SECRET")
RAPIDAPI_KEY = os.getenv("RAPIDAPI_KEY")

from config.config import SECRETS
import csv
import requests
from bs4 import BeautifulSoup

consumer_key = SECRETS["consumer_key"]
consumer_secret = SECRETS["consumer_secret"]
access_token = SECRETS["access_token"]
access_token_secret = SECRETS["access_token_secret"]


router = APIRouter()


@router.get("/")
async def default():
    return "server is running"


@router.get("/googleplay-reviews")
async def read_item():
    result, continuation_token = reviews(
        "in.swiggy.android",
        lang="en",  # defaults to 'en'
        sort=Sort.NEWEST,  # defaults to Sort.NEWEST
        count=100,  # defaults to 100
    )

    play_review = []
    for review in result:
        play_review.append(
            {
                "source": "google play store",
                "url": "https://play.google.com/store/apps/details?id=in.swiggy.android",
                "title": "google play review",
                "body": review["content"],
                "user": review["userName"],
                "upvote": review["thumbsUpCount"],
                "rating": review["score"],
                "created_at": review["at"],
            }
        )
    if any(play_review):  # Check if data exists
        fieldnames = list(play_review[0].keys())

    with open(
        "../data/google_play_voc.csv", "a", newline="", encoding="utf-8"
    ) as csvfile:  # Open in append mode
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        if csvfile.tell() == 0:  # Check if file is empty (write header only once)
            writer.writeheader()
        for issue in play_review:
            writer.writerow(issue)

    return result


@router.get("/reddit-reviews")
async def get_subreddit():
    """Retrieves review-like posts from Reddit and appends them to a CSV file.

    Returns:
        str: A message indicating the CSV file was updated successfully.
    """

    client_id = CLIENT_ID  # Replace with your actual client ID
    client_secret = CLIENT_SECRET  # Replace with actual client secret
    user_agent = "web:devrev-forge:v1 (by /u/smooth_profit4543)"  # Replace with your actual user agent

    reddit = praw.Reddit(
        client_id=client_id,
        client_secret=client_secret,
        user_agent=user_agent,
    )

    subreddit = reddit.subreddit("aws")  # Replace with the desired subreddit
    limit = 100  # Set the desired limit for fetched posts

    redditdata = []
    for submission in subreddit.rising(limit=limit):
        redditdata.append(
            {
                "source": "swiggy",
                "url": submission.url,
                "title": submission.title,
                "body": remove_emoji(submission.selftext),
                "created_at": submission.created_utc,
                "upvote": submission.score,
            }
        )

    # Fieldnames extraction (adapted from Response B with clarity)
    if any(redditdata):  # Check if data exists
        fieldnames = list(redditdata[0].keys())  # Extract from first item
    else:
        print("No reviews found to extract fieldnames.")
        return "No reviews found to be added to the CSV file."

    # CSV handling (adapted from Response A with improvements)
    try:
        with open(
            "../data/new_reddit_voc_data.csv", "a", newline=""
        ) as csvfile:  # Open in append mode
            writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
            if csvfile.tell() == 0:  # Check if file is empty (write header only once)
                writer.writeheader()
            for issue in redditdata:
                writer.writerow(issue)

            df = pd.read_csv(
                "../data/new_reddit_voc_data.csv", encoding="unicode_escape"
            )
            print(df)
            return "Reddit reviews appended to voc_data.csv successfully."
    except FileNotFoundError:
        print("File not found. Creating a new CSV file.")
        with open(
            "../data/new_reddit_voc_data.csv", "w", newline=""
        ) as csvfile:  # Create new file if needed
            writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
            writer.writeheader()
            for issue in redditdata:
                writer.writerow(issue)

            df = pd.read_csv(
                "../data/new_reddit_voc_data.csv", encoding="unicode_escape"
            )
            return "Reddit reviews appended to a new voc_data.csv file."
    except Exception as e:  # Handle other potential errors
        df = pd.read_csv("../data/new_reddit_voc_data.csv")
        print(f"An error occurred: {e}")
        return "An error occurred while appending reviews to voc_data.csv."


@router.get("/github-issues")
async def get_github_issues(
    owner: str = Query(..., description="Owner of the repository"),
    repo: str = Query(..., description="Name of the repository"),
):
    url = f"https://api.github.com/repos/{owner}/{repo}/issues?state=open&labels=bug"
    headers = {
        "Accept": "application/vnd.github+json",
        "Authorization": f"Bearer {GITHUB_PAT}",
        "X-GitHub-Api-Version": "2022-11-28",
    }

    response = requests.get(url, headers=headers)
    issues = response.json()

    filtered_data = []
    for issue in issues:
        filtered_data.append(
            {
                "source": "github",
                "url": issue["url"],
                "title": issue["title"],
                "body": issue["body"],
                "user_html_url": issue["user"]["html_url"],
                "created_at": issue["created_at"],
            }
        )

    if filtered_data:
        fieldnames = filtered_data[0].keys()  # Extract keys as field names
    else:
        fieldnames = []

    with open("../data/new_github_voc_data.csv", "w", newline="") as csvfile:
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        writer.writeheader()
        for issue in filtered_data:
            writer.writerow(issue)

    df = pd.read_csv("../data/new_github_voc_data.csv")
    df.to_excel("github_issues.xlsx", index=False)

    return filtered_data


@router.post("/example_search")
async def example_search_function(query: str):
    result = google_search(query, search_info=SearchInfo.URLS)
    return result


@router.get("/example_scrape")
async def scrape(url):
    result = requests.get(url)
    soup = BeautifulSoup(result.text, "html.parser")
    print(soup.prettify())


@router.get("/twitter")
async def get_tweets():
    url = "https://twitter154.p.rapidapi.com/search/search"

    querystring = {
        "query": "swiggy #help",
        "section": "top",
        "min_retweets": "1",
        "min_likes": "1",
        "limit": "20",
        "language": "en",
    }

    headers = {
        "X-RapidAPI-Key": RAPIDAPI_KEY,
        "X-RapidAPI-Host": "twitter154.p.rapidapi.com",
    }

    response = requests.get(url, headers=headers, params=querystring)

    result = response.json()

    filtered_data = []
    for tweet in result["results"]:
        filtered_data.append(
            {
                "source": "twitter",
                "url": tweet["expanded_url"],
                "title": "tweet status",
                "body": tweet["text"],
                "created_at": tweet["creation_date"],
                "username": tweet["user"]["username"],
                "upvote": tweet["favorite_count"],
            }
        )

    if filtered_data:
        fieldnames = filtered_data[0].keys()  # Extract keys as field names
    else:
        fieldnames = []

    with open("../data/twitter_data.csv", "a", newline="", encoding="utf-8") as csvfile:
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        writer.writeheader()
        for tweet in filtered_data:
            writer.writerow(tweet)

    return result["results"]


@router.get("/news_to_csv")
async def news_to_csv(url: str):
    """
    Scrapes news from a given URL and saves it to a CSV file. Currently, the function scrapes headlines and paragraphs from the URL and saves them to a CSV file.
    """

    result = requests.get(url)
    soup = BeautifulSoup(result.text, "html.parser")
    news = []
    for headline in soup.find_all("h3"):
        news.append({"Heading": headline.text, "Content": "", "Category": ""})
    for paragraph in soup.find_all("p"):
        news.append({"Heading": "", "Content": paragraph.text, "Category": ""})

    fieldnames = ["Heading", "Content", "Category"]
    with open("../data/news.csv", "w", newline="") as csvfile:
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        writer.writeheader()
        for item in news:
            writer.writerow(item)

    return news


@router.get("/ai")
async def use_ai():
    review = """google play store,https://play.google.com/store/apps/details?id=in.swiggy.android,Very useful and efficient,"Hey there, glad that we have stood up to your expectations. Thank you for the positive review and the perfect star rating. Keep Swiggying. 🙂",Anita Kuruvilla"""
    score = request_chat_gpt_api(NOISE_PROMPT, review)
    swot = request_chat_gpt_api(SWOT_PROMPT, review)
    sentiment = request_chat_gpt_api(SENTIMENT_PROMPT, review)

    print(score, swot, sentiment)

    # to csv
