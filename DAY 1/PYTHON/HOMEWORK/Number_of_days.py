def is_leap_year(year):
    return (year % 4 == 0 and year % 100 != 0) or (year % 400 == 0)

def days_in_month(year, month):
    if not (1900 <= year <= 9999):  
        return 0  
    if month == 2:
        return 29 if is_leap_year(year) else 28
    elif month in {1, 3, 5, 7, 8, 10, 12}:
        return 31
    elif month in {4, 6, 9, 11}:
        return 30


year = int(input().strip())
month = int(input().strip())

days = days_in_month(year, month)
if days == 0:
    print(0)
else:
    print(f"{days} Days")
