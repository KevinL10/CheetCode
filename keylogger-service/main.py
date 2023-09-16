import time

import keyboard


# time.sleep(2)
# time.sleep(60)

output = '''
def findMedianSortedArrays(self, nums1, nums2):
    nums = nums1 + nums2
    nums.sort()
    return (nums[(len(nums) - 1) // 2] + nums[(len(nums) - 1) // 2 - 1]) / 2
'''

class AutoSolver:
    def __init__(self):
        self.index = 0
        self.enabled = False

        keyboard.add_hotkey('ctrl+q', self.handle_toggle, suppress=True)
        # keyboard.add_hotkey('ctrl+shift+c', self.handle_exit, suppress=True)
        keyboard.on_press(self.handle_press)

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


    def handle_press(self,event):
        if not self.enabled:
            return
        
        if self.index >= len(output):
            return

        if event.name == "backspace":
            keyboard.send("backspace")
        else:
            # keyboard.send(f"backspace, {AutoSolver.map_chr_to_keystroke(output[self.index])}")
            keyboard.send("backspace")
            keyboard.write(AutoSolver.map_chr_to_keystroke(output[self.index]))
            self.index += 1


    def handle_toggle(self):
        self.enabled = not self.enabled
        
    def handle_exit(self):
        exit()


a = AutoSolver()

time.sleep(60)
