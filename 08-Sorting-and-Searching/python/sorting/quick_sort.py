def partition(arr, l, h):
    pivot = arr[l]
    i = l + 1
    j = h
    while True:
        while i <= h and arr[i] <= pivot:
            i += 1
        while j >= l and arr[j] > pivot:
            j -= 1
        if i >= j:
            break
        arr[i], arr[j] = arr[j], arr[i]
    arr[l], arr[j] = arr[j], arr[l]
    return j

def quick_sort(arr, l, h):
    if l < h:
        pi = partition(arr, l, h)
        quick_sort(arr, l, pi - 1)
        quick_sort(arr, pi + 1, h)


n = int(input())
arr = list(map(int, input().split()))
quick_sort(arr, 0, n - 1)
print(*arr)