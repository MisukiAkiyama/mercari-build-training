class Solution:
    def wordPattern(self, pattern: str, s: str) -> bool:
        #ans = True
        s_list = list(s.split())
        pattern_dict = {}
        if len(pattern) != len(s_list):
            return False
        for i in range(len(pattern)):
            if pattern[i] not in pattern_dict.keys():
                if s_list[i] in pattern_dict.values():
                    return False
                pattern_dict[pattern[i]] = s_list[i]
            else:
                if s_list[i] != pattern_dict[pattern[i]]:
                    return False
        return True
        