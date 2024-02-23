import configparser

config = configparser.ConfigParser()
config.read("app/config/configuration.ini")

SECRETS = {
    "consumer_key": config.get("SECRETS", "consumer_key"),
    "consumer_secret": config.get("SECRETS", "consumer_secret"),
    "access_token": config.get("SECRETS", "access_token"),
    "access_token_secret": config.get("SECRETS", "access_token_secret"),
}
