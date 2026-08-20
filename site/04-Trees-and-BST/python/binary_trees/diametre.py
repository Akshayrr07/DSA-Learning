from collections import deque
class Node:
  def __init__(self,data):
    self.data = data
    self.left = self.right = None

def buildtree(arr):
  if not arr or arr[0] == -1:
    return None
  root = Node(arr[0])
  q = deque([root])
  i = 1
  
  while i < len(arr):
    curr = q.popleft()
    if arr[i] != -1:
      curr.left = Node(arr[i])
      q.append(curr.left)
    i += 1
    
    if i < len(arr) and arr[i] != -1:
      curr.right = Node(arr[i])
      q.append(curr.right)
    i += 1
      
  return root

def diameter(root):
  dia = [0]
  
  def height(node):
    if not node:
      return 0
    lh = height(node.left)
    rh = height(node.right)
    dia[0] = max(dia[0],lh+rh+1)
    return 1 + max(lh,rh)
  
  height(root)
  return dia[0]

arr = list(map(int,input().split()))
root = buildtree(arr)
print(diameter(root))

