# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, x):
#         self.val = x
#         self.next = None

class Solution:
    def getIntersectionNode(self, headA: ListNode, headB: ListNode) -> Optional[ListNode]:
        aNode = headA
        bNode = headB

        if aNode == None or bNode == None:
            return None
        while(aNode != bNode):
            #print(f"aNode={aNode}")
            #print(f"bNode={bNode}")
            if aNode == None:
                aNode = headB
            else:
                aNode = aNode.next
            if bNode == None:
                bNode = headA
            else:
                bNode = bNode.next
        return aNode
        
        