def merge(arr, left, mid, right):
	temp = []
	i, j = left, mid + 1
	while i <= mid and j <= right:
		if arr[i] <= arr[j]:
			temp.append(arr[i])
			i += 1
		else:
			temp.append(arr[j])
			j += 1
	while i <= mid:
		temp.append(arr[i])
		i += 1
	while j <= right:
		temp.append(arr[j])
		j += 1
	arr[left:right + 1] = temp

def merge_sort(arr, left, right):
	if left < right:
		mid = (left + right) // 2
		merge_sort(arr, left, mid)
		merge_sort(arr, mid + 1, right)
		merge(arr, left, mid, right)

# Input handling
n = int(input())
arr = list(map(int, input().split()))
merge_sort(arr, 0, n - 1)
print(*arr)