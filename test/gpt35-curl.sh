curl https://api.openai.com/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -d '{
  "model": "gpt-3.5-turbo",
  "messages": [
    {
      "role": "user",
      "content": "You are an expert competitive programmer. You write efficient code. You are currently in a technical interview.\n\n    Output the solution to the following programming question. Only output code. Do not output any explanatory comments. The function should be written in Python3. Every line output should be valid Python3. Here is your problem:\n\n    Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\n\nYou can return the answer in any order.\n\nExample 1:\n\nInput: nums = [2,7,11,15], target = 9\nOutput: [0,1]\nExplanation: Because nums[0] + nums[1] == 9, we return [0, 1].\nExample 2:\n\nInput: nums = [3,2,4], target = 6\nOutput: [1,2]\nExample 3:\n\nInput: nums = [3,3], target = 6\nOutput: [0,1]\n\n\nConstraints:\n\n2 <= nums.length <= 104\n-109 <= nums[i] <= 109\n-109 <= target <= 109\nOnly one valid answer exists.\n\n\nFollow-up: Can you come up with an algorithm that is less than O(n2) time complexity?\n\n    Your solution must match this function signature:\n\n    def twoSum(self, nums: List[int], target: int) -> List[int]:"
    },
    {
      "role": "assistant",
      "content": "def twoSum(nums, target):\n    num_map = {}\n    for i, num in enumerate(nums):\n        complement = target - num\n        if complement in num_map:\n            return [num_map[complement], i]\n        num_map[num] = i\n    return []"
    },
    {
      "role": "assistant",
      "content": "The code above is a solution to the given problem. It uses a hash map to store the indices of the numbers encountered so far. For each number, it checks if the complement (target - num) is already in the hash map. If it is, it returns the indices of the two numbers. If not, it adds the current number and its index to the hash map. This solution has a time complexity of O(n) because it only requires a single pass through the array."
    }
  ],
  "temperature": 0,
  "max_tokens": 256,
  "top_p": 1,
  "frequency_penalty": 0,
  "presence_penalty": 0
}'
