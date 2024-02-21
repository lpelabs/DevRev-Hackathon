from typing import Union
from google_play_scraper import Sort, reviews
import praw
import tweepy
import requests
import csv
from openpyxl import Workbook
import pandas as pd
import json
import itertools

from fastapi import FastAPI, Query

import re


def remove_emoji(text):
    """
    Removes emojis from a given text string.

    Args:
        text: The text string to remove emojis from.

    Returns:
        str: The text string with emojis removed.
    """
    emoji_pattern = re.compile(
        "["
        "\U0001F600-\U0001F64F"  # Emoticons
        "\U0001F300-\U0001F5FF"  # Misc Symbols and Pictographs
        "\U0001F680-\U0001F6FF"  # Transport and Map Symbols
        "\U0001F1E0-\U0001F1FF"  # Flags
        "\U0001F000-\U0001F0FF"  # Symbols
        "]+",
        flags=re.UNICODE,
    )
    return emoji_pattern.sub("", text)


app = FastAPI()

consumer_key = "ChvUYRSoyT5R8UojdInGs8ecE"
consumer_secret = "cPFgldAPTp3QtBqKrzLolQVrb4GgmfguZiYc0u2d3xMLeSoEo8"
access_token = "1522583300895821825-ozGpU6VjNMLEFi4wb3WbgSkFMJuHE1"
access_token_secret = "AKeHaDzC5EL58tdZLk9CgPbBalmsgdQpDxjbHIgbLht4N"

# def csv_to_xlsx(csv_file_path, xlsx_file_path):
#     workbook = Workbook()
#     sheet = workbook.active

#     with open(csv_file_path, 'r') as csvfile:
#         reader = csv.reader(csvfile)
#         for row in reader:
#             sheet.append(row)

#     workbook.save(xlsx_file_path)


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/reviews")
def read_item():
    result, continuation_token = reviews(
        "in.swiggy.android",
        lang="en",  # defaults to 'en'
        country="us",  # defaults to 'us'
        sort=Sort.NEWEST,  # defaults to Sort.NEWEST
        count=100,  # defaults to 100
        filter_score_with=5,  # defaults to None(means all score)
    )

    play_review = []
    for review in result:
        play_review.append(
            {
                "source": "google play store",
                "url": "https://play.google.com/store/apps/details?id=in.swiggy.android",
                "title": review["content"],
                "body": review["replyContent"],
                "user": review["userName"],
            }
        )
        print(review["content"])

    if any(play_review):  # Check if data exists
        fieldnames = list(play_review[0].keys())

    with open(
        "voc_data.csv", "a", newline="", encoding="utf-8"
    ) as csvfile:  # Open in append mode
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        if csvfile.tell() == 0:  # Check if file is empty (write header only once)
            writer.writeheader()
        for issue in play_review:
            writer.writerow(issue)

    return result


@app.get("/reddit-reviews")
def get_subreddit():
    """Retrieves review-like posts from Reddit and appends them to a CSV file.

    Returns:
        str: A message indicating the CSV file was updated successfully.
    """

    client_id = "VZF8OjxlxZfEF2qnjp9skA"  # Replace with your actual client ID
    client_secret = (
        "eEbdNTN3chmek3gOve-l0wbqkXj7EA"  # Replace with your actual client secret
    )
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
                "source": "reddit",
                "url": submission.url,
                "title": submission.title,
                "body": remove_emoji(submission.selftext),
                "user": submission.created_utc,
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
        with open("voc_data.csv", "a", newline="") as csvfile:  # Open in append mode
            writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
            if csvfile.tell() == 0:  # Check if file is empty (write header only once)
                writer.writeheader()
            for issue in redditdata:
                writer.writerow(issue)

            df = pd.read_csv("voc_data.csv", encoding="unicode_escape")
            print(df)
            return "Reddit reviews appended to voc_data.csv successfully."
    except FileNotFoundError:
        print("File not found. Creating a new CSV file.")
        with open(
            "voc_data.csv", "w", newline=""
        ) as csvfile:  # Create new file if needed
            writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
            writer.writeheader()
            for issue in redditdata:
                writer.writerow(issue)

            df = pd.read_csv("voc_data.csv", encoding="unicode_escape")
            return "Reddit reviews appended to a new voc_data.csv file."
    except Exception as e:  # Handle other potential errors
        df = pd.read_csv("voc_data.csv")
        print(f"An error occurred: {e}")
        return "An error occurred while appending reviews to voc_data.csv."


@app.get("/github-issues")
def get_github_issues(
    owner: str = Query(..., description="Owner of the repository"),
    repo: str = Query(..., description="Name of the repository"),
):
    url = f"https://api.github.com/repos/{owner}/{repo}/issues?state=open&labels=bug"
    headers = {
        "Accept": "application/vnd.github+json",
        "Authorization": "Bearer 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",
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
            }
        )

    if filtered_data:
        fieldnames = filtered_data[0].keys()  # Extract keys as field names
    else:
        fieldnames = []

    with open("voc_data.csv", "w", newline="") as csvfile:
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        writer.writeheader()
        for issue in filtered_data:
            writer.writerow(issue)

    df = pd.read_csv("voc_data.csv")
    df.to_excel("github_issues.xlsx", index=False)

    return filtered_data
