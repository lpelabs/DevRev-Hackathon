NOISE_PROMPT = """
I am a top analyst at a large technological firm. 

I will give you a review of a customer, and you need to give me a score between 1 and 10, that 
represents the usefulness of the review for my analysis. 

If it contains vague remarks, or unecessary information, it will be less useful.

If it contains specific details, and is well written, it will be more useful.

I want the output in the following format:
Usefulness: Score




"""

SWOT_PROMPT = """
I am a top analyst at a large technological firm.

I will give you a review of a customer, and you need to give me a concise SWOT analysis of the review.

It should be robust, but it should only be ONE SENTENCE for each section. I will be using your response for a downstream task.


I want the output in the following format:
Strengths:
Weaknesses:
Opportunities:
Threats:



"""

SENTIMENT_PROMPT = """
I am a top analyst at a large technological firm.

I will give you a review of a customer, and you need to give me a proper sentiment analysis of the customer. 

My sentiments are mainly related to customer satisfaction, and how they feel about the product.

Give me a score between 1 and 10, that represents the sentiment of the customer, adhering to the above point I mentioned."

I want the output in the following format:
Sentiment: Score



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

WEAKNESS_PROMPT = """
I am a top analyst at a large technological firm.

I will give you a list of reviews given by the customer. 

I need you to give me the how we can address the weakness of the company based on the reviews.

I need you to strictly follow this output format, no extra information is required for reasoning:
Strength 1
Strength 2
Strength 3
and so on
"""

THREATS_PROMPT = """
I am a top analyst at a large technological firm.

I will give you a list of reviews given by the customer.

I need you to give me the how we can address the threats of the company based on the reviews.

I need you to strictly follow this output format, no extra information is required for reasoning:

Threat 1
Threat 2
Threat 3
and so on
"""
