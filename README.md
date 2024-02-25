# DevRev-Hackathon

<div align="center">

<img src="./devrev_logo.png" alt="DevRev Logo" width="100"/>

<h1 align="center">Voice To Help v4</h1>

<p align="center">
    Create a ticket by identifying customer problems from different platforms.
</p>
</div>

## Table of Contents

1. [Overview](#overview)
    - [Project Description](#project-description)
    - [Manifest File](#manifest-file)

2. [Configuration](#configuration)
    - [Service Account](#service-account)
    - [Keyrings](#keyrings)
    - [Inputs](#inputs)

3. [Event Sources](#event-sources)

4. [Functions](#functions)

5. [Tags](#tags)

6. [ML Pipeline](#ml-pipeline)

## Overview

### Project Description

Voice To Help v4 is a Snap-in for DevRev that allows users to create tickets by identifying customer problems from different platforms. It leverages various sources of data, including Twitter, Google Play, and Reddit, to gather insights and automatically generate tickets for the specified company.

### Manifest File

The `manifest.yaml` file serves as a configuration file for the Voice To Help v4 Snap-in. It provides essential details about the Snap-in, including its version, name, and description. The manifest file is written in YAML format for easy readability and configuration.

#### Version

The `version` field specifies the version of the manifest file. In this case, it is set to "2," indicating the format version.

#### Name

The `name` field specifies the name of the Snap-in, which is "Voice To Help v4."

#### Description

The `description` field provides a brief overview of the Snap-in's purpose and functionality. In this case, it states that the Snap-in is designed to create tickets by identifying customer problems from different platforms.

#### Service Account

The `service_account` section includes details about the service account associated with the Snap-in. The `display_name` field specifies the name of the service account, which is "Voice To Help Bot."

#### Keyrings

The `keyrings` section defines different keyrings used by the Snap-in. Each keyring contains information about specific API keys required for the Snap-in's functionality. Keyrings are categorized, and details about the organization keyring are provided.

#### Inputs

The `inputs` section lists the various inputs required by the Snap-in. These inputs include information such as the company name, application ID, default part ID, default owner ID, subreddit, GitHub details, Twitter handle, and Twitter hashtags. Each input has specific attributes like name, description, field type, and default value, among others.

The inputs are essential for configuring and customizing the Snap-in's behavior based on user-specific details.

This manifest file serves as a central configuration document, ensuring that the Snap-in operates with the correct settings and parameters. Developers and users can refer to the manifest file to understand the Snap-in's purpose, key dependencies, and required inputs.

## Configuration

### Service Account

The `service_account` section in the `manifest.yaml` file provides details about the service account associated with the Voice To Help v4 Snap-in.

#### Display Name

The `display_name` field specifies the name of the service account, which is "Voice To Help Bot."

### Keyrings

The `keyrings` section categorizes and describes different keyrings used by the Voice To Help v4 Snap-in. Keyrings store API keys necessary for the Snap-in's functionality.

#### Organization Keyring

The organization keyring includes the following details:

- **Name:** openai_api_key
  - **Description:** API Key for OPENAI. Follow [this link](https://platform.openai.com/api-keys) to obtain one.
  - **Types:** snap_in_secret
  - **Display Name:** OpenAI API Key

- **Name:** rapid_api_key
  - **Description:** API Key for RAPIDAPI. Obtain the key from [RAPIDAPI](https://rapidapi.com/).
  - **Types:** snap_in_secret
  - **Display Name:** Rapid API Key

### Inputs

The `inputs` section lists the various inputs required by the Voice To Help v4 Snap-in. These inputs are essential for configuring and customizing the Snap-in's behavior based on user-specific details.

#### Company Name

- **Name:** company_name
  - **Description:** The name of your Company.
  - **Field Type:** text
  - **Is Required:** true
  - **Default Value:** ""

#### Application ID

- **Name:** app_id
  - **Description:** The Google Play id of the application (the ?id= parameter on the URL). Separate values by comma for multiple apps.
  - **Field Type:** text
  - **Is Required:** true
  - **Default Value:** ""

#### Default Part ID

- **Name:** default_part_id
  - **Description:** Default part under which to create tickets.
  - **Field Type:** id
  - **ID Type:** product, capability, feature, enhancement
  - **Is Required:** true
  - **Default Value:** "don:core:dvrv-us-1:devo/xxx:product/xxx"

#### Default Owner ID

- **Name:** default_owner_id
  - **Description:** Default owner of the tickets.
  - **Field Type:** id
  - **ID Type:** devu
  - **Is Required:** true
  - **Default Value:** "don:identity:dvrv-us-1:devo/xxx:devu/xxx"

#### Subreddit

- **Name:** subreddit
  - **Description:** The name of your subreddit.
  - **Field Type:** text
  - **Is Required:** true
  - **Default Value:** ""

#### GitHub Details

- **Name:** github_repo
  - **Description:** URL of the public GitHub repo to track the issues.
  - **Base Type:** text
  - **Field Type:** array
  - **Is Required:** true
  - **Default Value:** [""]

- **Name:** github_owner
  - **Description:** Name of the owner of the public GitHub repo to track the issues.
  - **Field Type:** text
  - **Is Required:** true
  - **Default Value:** ""

- **Name:** github_repo_name
  - **Description:** Name of the repo of the public GitHub repo to track the issues.
  - **Field Type:** text
  - **Is Required:** true
  - **Default Value:** ""

#### Twitter Details

- **Name:** twitter_handle
  - **Description:** Username of the company on Twitter. Separate usernames by comma for multiple IDs.
  - **Field Type:** text
  - **Is Required:** true
  - **Default Value:** ""

- **Name:** twitter_hashtag
  - **Description:** Hashtags to look for on Twitter. Separate hashtags by comma for multiple values.
  - **Field Type:** text
  - **Is Required:** true
  - **Default Value:** "#help"

These inputs collectively allow users to customize the Voice To Help v4 Snap-in's behavior, ensuring it aligns with the specific requirements of their organization and platforms.

## Event Sources

The `event_sources` section in the `manifest.yaml` file defines the event sources used by the Voice To Help v4 Snap-in. These sources trigger specific events at predefined intervals or conditions.

### Timer Event Source

The timer event source named "timer-event-source" sends events every 10 minutes based on the specified CRON expression.

## Functions

The `functions` section outlines the functions implemented by the Voice To Help v4 Snap-in. These functions perform specific tasks and contribute to the overall functionality of the Snap-in.

### Ticket Creator

The "ticket_creator" function creates a new ticket when triggered.

### Snapin Intro

The "snapin_intro" function provides an introduction to the Voice To Help Snap-in.

### Insights

The "insights" function retrieves insights from all platforms and creates tickets.

## Tags

The `tags` section categorizes different tags that can be associated with tickets created by the Voice To Help v4 Snap-in. These tags help classify and organize tickets based on their nature.

### Bug

- **Name:** bug
  - **Description:** This is a bug.

### Feature Request

- **Name:** feature_request
  - **Description:** This is a feature request.

### Question

- **Name:** question
  - **Description:** This is a question.

### Feedback

- **Name:** feedback
  - **Description:** This is feedback.

### Failed to Infer Category

- **Name:** failed_to_infer_category
  - **Description:** Failed to infer category.

## ML Pipeline

The `ML Pipeline` section in the documentation outlines the machine learning pipeline implemented in the Voice To Help v4 Snap-in. This pipeline is responsible for processing data from various sources, applying machine learning models, and generating valuable insights.

### Model Implementation

The ML pipeline includes a flexible and adaptable model implementation that can handle data from different sources. It follows a general structure that can be customized based on the availability and interpretation of data.

#### Function Overview:

1. **Data Preprocessing:**
   - Extracts relevant information from raw data obtained from different sources.
   - Applies necessary embeddings or transformations to enhance data representation.

2. **Filtering and Selection:**
   - Implements filters or thresholds to select valuable data for further analysis.
   - Ensures that only high-quality and relevant information is considered.

3. **Feature Extraction:**
   - Extracts essential features from the data, such as user information, date, ratings, and sentiment.
   - Applies embeddings or encoding techniques to represent textual or categorical data.

4. **Clustering:**
   - Utilizes clustering techniques to identify patterns, groups, or categories within the data.
   - Can include SWOT analysis-based clustering or other customized approaches.

5. **Sentiment Analysis:**
   - Performs sentiment analysis on textual data to understand user sentiments.
   - Creates sentiment timelines or insights based on the processed data.

6. **Insights Generation:**
   - Gathers insights from the clustering results, sentiment analysis, and identified areas of improvement.
   - Prepares the final processed data and insights for further actions.

7. **Output and Storage:**
   - Saves the final processed data and generated insights, making them available for creating tickets or other functionalities within the Snap-in.

The model implementation within the ML pipeline is designed to be versatile, allowing seamless integration with various data sources and adaptation to specific requirements of the Voice To Help v4 Snap-in.
