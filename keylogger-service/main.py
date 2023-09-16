from base64 import b64decode

import time
import string

import keyboard
import sys

# time.sleep(2)
# time.sleep(60)

output = '''
    nums = nums1 + nums2
    nums.sort()
    return (nums[(len(nums) - 1) // 2] + nums[(len(nums) - 1) // 2 - 1]) / 2
'''

class AutoSolver:
    def __init__(self, text):
        self.lines = [line.strip() for line in text.split('\n') if line.strip()]
        print(self.lines)
        self.current_line = 0
        self.index = 0
        self.enabled = False
        
        keyboard.add_hotkey('ctrl+q', self.handle_toggle, suppress=True)


    # Returns the keystroke-combination necessary to produce chr
    # chr is a character part of the initial "LLM output" text
    @staticmethod
    def map_chr_to_keystroke(chr):
        MAPPING = {
            ' ': 'space',
            '+': 'plus',
        }
        # if chr.isupper():
        #     return f"shift+{chr.lower()}"
        # if chr == ' ':
        #     r
        return chr


    def handle_press(self, chr):
        if not self.enabled:
            keyboard.write(chr)
            return

        if self.index >= len(output):
            return
        
        # keyboard.send(f"backspace, {AutoSolver.map_chr_to_keystroke(output[self.index])}")
        # keyboard.send("backspace")

        if self.index == len(self.lines[self.current_line]):
            keyboard.write("\n")
            self.current_line += 1
            self.index = 0
            return
        
        if self.current_line >= len(self.lines):
            return
        
        keyboard.write(AutoSolver.map_chr_to_keystroke(self.lines[self.current_line][self.index]))
        self.index += 1


    def handle_toggle(self):
        print("Toggle ", self.enabled)
        self.enabled = not self.enabled

        if self.enabled:
            for c in string.ascii_uppercase + string.ascii_lowercase:
                keyboard.add_hotkey(c, lambda: self.handle_press(c), suppress=True)

            keyboard.add_hotkey("backspace", self.handle_backspace)
        else:
            keyboard.unhook_all_hotkeys()
            keyboard.add_hotkey('ctrl+q', self.handle_toggle, suppress=True)

    def handle_backspace(self):
        if self.enabled:
            self.index -= 1

    def handle_exit(self):
        exit()



if __name__ == "__main__":
    # solver = AutoSolver(b64decode(sys.argv[1]).decode())
    solver = AutoSolver(output)

    time.sleep(60)
