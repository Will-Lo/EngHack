#include <stdio.h>
#include <iostream>

using namespace std;

int main() {
    int x;
    int y;
    int average;

    cin >> x;
    cin >> y;

    average = (x+y)/2;

    cout << "Average of " << x << " and " << y << " is " << average << endl;

    return 0;
}
