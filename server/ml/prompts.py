NOISE_PROMPT = """
I am a top analyst at a large technological firm. 

I will give you a review of a customer, and you need to give me a score between 1 and 10, that 
represents the usefulness of the review for my analysis. 

If it contains vague remarks, or unecessary information, it will be less useful.

If it contains specific details, and is well written, it will be more useful.

Strictly output the score between 1 and 10, and nothing else.

I want it in the following format:
Usefulness: Score

"""

SWOT_PROMPT = """
I am a top analyst at a large technological firm.

I will give you a review of a customer, and you need to give me a concise SWOT analysis of the review.

It should be robust, but it should only be one sentence for each section.

The format should be the following : 
Strengths:
Weaknesses:
Opportunities:
Threats:

Strictly output the SWOT analysis, and nothing else.

"""

SENTIMENT_PROMPT = """
I am a top analyst at a large technological firm.

I will give you a review of a customer, and you need to give me a proper sentiment analysis of the customer. 

My sentiments are mainly related to customer satisfaction, and how they feel about the product.

Give me a score between 1 and 10, that represents the sentiment of the customer, adhering to the above point I mentioned."

The format of the output should be the following:
Sentiment: Score

Strictly output the score between 1 and 10, and nothing else.

"""

CONTINENT_PROMPT = """
I am a professor of ethnic studies, I need you to assist me for this very important task.

I will give you the name of a person, and I need you to tell me which continent that person can most likely be from. 

If you have a few possibilities, then you must tell me the most probable location.

I need you to strictly follow this output format, no extra information is required for reasoning:
Continent: Answer
"""

COUNTRY_PROMPT = """
I am a professor of ethnic studies, I need you to assist me for this very important task.

I will give you the name of a person, and I need you to tell me which county that person can most likely be from. 

If you have a few possibilities, then you must tell me the most probable location.

I need you to strictly follow this output format, no extra information is required for reasoning:
Country: Answer
"""