NOISE_PROMPT = """
I am a top analyst at a large technological firm. 

I will give you a review of a customer, and you need to give me a score between 1 and 10, that 
represents the usefulness of the review for my analysis. 

If it contains vague remarks, or unecessary information, it will be less useful.

If it contains specific details, and is well written, it will be more useful.

I want a JSON in the following format:
Usefulness: Score

Strictly output the JSON, and nothing else.



"""

SWOT_PROMPT = """
I am a top analyst at a large technological firm.

I will give you a review of a customer, and you need to give me a concise SWOT analysis of the review.

It should be robust, but it should only be one sentence for each section.

I want a JSON in the following format:
Strengths:
Weaknesses:
Opportunities:
Threats:

Strictly output the JSON, and nothing else.

"""

SENTIMENT_PROMPT = """
I am a top analyst at a large technological firm.

I will give you a review of a customer, and you need to give me a proper sentiment analysis of the customer. 

My sentiments are mainly related to customer satisfaction, and how they feel about the product.

Give me a score between 1 and 10, that represents the sentiment of the customer, adhering to the above point I mentioned."

I want a JSON in the following format:
Sentiment: Score

Strictly output the JSON, and nothing else.

"""


