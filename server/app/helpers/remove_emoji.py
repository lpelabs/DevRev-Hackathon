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

# def csv_to_xlsx(csv_file_path, xlsx_file_path):
#     workbook = Workbook()
#     sheet = workbook.active

#     with open(csv_file_path, 'r') as csvfile:
#         reader = csv.reader(csvfile)
#         for row in reader:
#             sheet.append(row)

#     workbook.save(xlsx_file_path)