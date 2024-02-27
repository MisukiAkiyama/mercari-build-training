class Solution:
    def findDisappearedNumbers(self, nums: List[int]) -> List[int]:
        n = len(nums)
        set_nums = set(nums)
        new_nums = {i for i in range(1,n+1)}
        return list(new_nums - set_nums & new_nums)
