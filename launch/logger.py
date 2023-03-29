import logging
import sys

CONFIG = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'file': {
            # 'level': 'WARNING',
            'formatter': 'verbose',
            'class': 'logging.FileHandler',
            'filename': 'pmm.log'
        }
    },
    'loggers': {
        '': {
            'level': 'WARNING',
            'handlers': ['file'],
            'propagate': True
        }
    },
    'formatters': {
        'verbose': {
            'format': '[%(asctime)s] - {%(name)s:%(module)s} - [%(levelname)s] - %(message)s',
            'datefmt': '%m/%d/%Y %I:%M:%S %p'
        },
        'simple': {
            'format': '[levelname] - message',
        },
    },
}

# PMM logger
logger = logging.getLogger("pmm")
# PMM-API logger
logger_api = logging.getLogger("pmm-api")
# PMM ui logger
logger_ui = logging.getLogger("")


class LogLevelFilter(logging.Filter):
    def __init__(self, max_level):
        super(LogLevelFilter, self).__init__()

        self.max_level = max_level

    def filter(self, record):
        return record.levelno <= self.max_level


def initLogger(console=False, log_dir=False, verbose=False):
    """
    Setup PMM logger. Logger instance will be named 'pmm'.

    * RotatingFileHandler: for pmm.logs
    * LogListHandler: ui logging
    * StreamHnadler: console logging
    """

    # Configure logger 
    logger.propagate = False
    logger.setLevel(logging.DEBUG if verbose else logging.INFO)
    logger_api.propagate = False
    logger_api.setLevel(logging.DEBUG if verbose else logging.INFO)
    logger_ui.propagate = False
    logger_ui.setLevel(logging.DEBUG if verbose else logging.INFO)

    # Setup console logger
    if console:
        console_formatter = logging.Formatter('[%(asctime)s] - {%(name)s:%(module)s} - [%(levelname)s] - %(message)s', '%Y-%m-%d %H:%M:%S')

        stdout_handler = logging.StreamHandler(sys.stdout)
        stdout_handler.setFormatter(console_formatter)
        stdout_handler.setLevel(logging.DEBUG)
        stdout_handler.addFilter(LogLevelFilter(logging.INFO))

        stderr_handler = logging.StreamHandler(sys.stderr)
        stderr_handler.setFormatter(console_formatter)
        stderr_handler.setLevel(logging.WARNING)

        logger.addHandler(stdout_handler)
        logger.addHandler(stderr_handler)


# Expose logger methods
# Main logger
info = logger.info
warn = logger.warning
error = logger.error
debug = logger.debug
warning = logger.warning
exception = logger.exception

# PMM API logger
api_info = logger_api.info
api_warn = logger_api.warning
api_error = logger_api.error
api_debug = logger_api.debug
api_warning = logger_api.warning
api_exception = logger_api.exception

# PMM UI logger
ui_info = logger_ui.info
ui_warn = logger_ui.warning
ui_error = logger_ui.error
ui_debug = logger_ui.debug
ui_warning = logger_ui.warning
ui_exception = logger_ui.exception