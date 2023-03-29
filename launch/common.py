import distro
import platform

PRODUCT = 'PMM'
PLATFORM = platform.system()
PLATFORM_RELEASE = platform.release()
PLATFORM_VERSION = platform.version()
PLATFORM_LINUX_DISTRO = ' '.join(x for x in distro.linux_distribution() if x)
PLATFORM_DEVICE_NAME = platform.node()
PYTHON_VERSION = platform.python_version()

