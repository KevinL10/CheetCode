"""
The driver code for working with the keyboard inputs.
"""
from sshkeyboard import listen_keyboard


def press(key):
    """
    Key press handler.
    """
    print(f"'{key}' pressed")


def release(key):
    """
    Key release handler.
    """
    print(f"'{key}' released")


def main() -> None:
    """
    Main loop for listening to key presses.
    """
    listen_keyboard(
        on_press=press,
        on_release=release,
    )


if __name__ == "__main__":
    print("Hello, world!")

    main()
