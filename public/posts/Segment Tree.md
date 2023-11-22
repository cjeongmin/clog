---
tags:
  - data-structure
date: 2023-07-30
---

# Segment Tree

세그먼트 트리는 특정 부분에 대해서 특정한 값을 기록하는 자료구조이다.
세그먼트 트리를 이용하면 특정 부분에 대해서 $O(logN)$ 에 구할 수 있다.

세그먼트 트리의 리프 노드와 리프 노드가 아닌 노드는 다음과 같은 의미를 가진다.

- 리프 노드: 배열의 그 수 자체
- 리프 노드가 아닌 노드: 왼쪽 자식과 오른쪽 자식의 합을 저장

어떤 노드의 번호가 $N$일 때, 왼쪽 자식의 번호는 $2N$, 오른쪽 자식의 번호는 $2N+1$이 된다.

![[Pasted image 20230730114721.png]]

노드 번호는 아래와 같이 설정된다.

![[Pasted image 20230730114821.png]]

---

## Init

세그먼트 트리는 Full Binary Tree의 형태를 가진다. 만약, $N$이 2의 제곱꼴인 경우에는 Perfect Binary Tree가 된다.

리프 노드가 $N$개인 Full Binary Tree에는 리프 노드가 아닌 노드가 $N - 1$개 있다. 따라서 필요한 노드의 수는 $2N - 1$개가 된다. $N$이 2의 제곱꼴이 아닌 경우에 높이 $H = ceil(logN)$이 된다.

세그먼트 트리의 정보를 저장하기 위해 배열을 사용하고, 높이가 $H$인 Perfect Binary Tree에 있는 노드의 개수가 배열의 크기가 되고, 이 값은 $2^{H+1} - 1$이 된다.

아래는 세그먼트 트리를 만드는 소스이다.

```python
def init(a, tree, node, start, end):
    if start == end:
        tree[node] = a[start]
    else:
        init(a, tree, node*2, start, (start+end)//2)
        init(a, tree, node*2+1, (start+end)//2+1, end)
        tree[node] = tree[node*2] + tree[node*2+1]
```

`start == end`인 경우는 리프 노드인 경우이다. 리프 노드는 배열의 그 수를 저장해야 하기 때문에, `tree[node] = a[start]`가 된다.

`node`의 왼쪽 자식은 `node*2`이고, 오른쪽 자식은 `node*2+1`이다. 또, `node`에 저장된 구간이 `[start, end]`라면, 왼쪽 자식은 `[start, (start+end)/2]`, 오른쪽 자식은 `[(start+end)/2+1, end]`가 저장된 구간이다.

`tree[node]`에 저장될 값을 구하려면 왼쪽 자식에 저장된 값 `tree[node*2]`, 오른쪽 자식에 저장된 값 `tree[node*2+1]`을 먼저 구해야 하고, 따라서, 재귀 함수를 이용해 각각의 값을 먼저 구한 후 해당 값을 이용하여 저장될 값을 구한다.

---

## Query

구간 `[left, right]`가 주어졌을 때, 합을 구하려면 트리를 루트부터 순회하면서 각 노드에 저장된 구간의 정보와 `[left, right]`와의 관계를 살펴보아야 한다.

![[Pasted image 20230730115949.png]]

`node`에 저장된 구간이 `[start, end]`이고, 합을 구해야하는 구간이 `[left, right]`라면 다음과 같이 4가지 경우로 나누어질 수 있다.

1. `[left, right]`와 `[start, end]`가 겹치지 않는 경우
2. `[left, right]`가 `[start, end]`를 완전히 포함하는 경우
3. `[start, end]`가 `[left, right]`를 완전히 포함하는 경우
4. `[left, right]`와 `[start, end]`가 겹쳐져 있는 경우 (1, 2, 3 제외한 나머지 경우)

1번 경우는 `if (left > end || right < start)`로 나타낼 수 있다. `left > end`는 `[start, end]`뒤에 `[left, right]`가 있는 경우이고, `right < start`는 `[start, end]`앞에 `[left, right]`가 있는 경우이다. 이 경우에는 겹치지 않기 때문에, 더 이상 탐색을 이어나갈 필요가 없다. 따라서 여기서는 합을 구하므로 항등원인 `0`을 리턴해 탐색을 종료한다.

2번 경우는 `if (left <= start && end <= right)`로 나타낼 수 있다. 이 경우도 더 이상 탐색을 이어나갈 필요가 없다. 구해야하는 합의 범위는 `[left, right]`인데, `[start, end]`는 그 범위에 모두 포함되고, 그 `node`의 자식도 모두 포함되기 때문에 더 이상 호출을 하는 것은 비효율적이다. 따라서, `tree[node]`를 리턴해 탐색을 종료한다.

3번과 4번의 경우에는 왼쪽 자식과 오른쪽 자식을 루트로 하는 트리에서 다시 탐색을 시작해야 한다.

아래는 세그먼트 트리에서 `[left, right]`의 합을 구하는 소스이다.

```python
def query(tree, node, start, end, left, right):
    if left > end or right < start:
        return 0
    if left <= start and end <= right:
        return tree[node]
    lsum = query(tree, node*2, start, (start+end)//2, left, right)
    rsum = query(tree, node*2+1, (start+end)//2+1, end, left, right)
    return lsum + rsum
```

### 시간 복잡도

트리의 각 레벨에서 방문하는 노드의 개수는 4개를 넘지 않는다.트리의 높이 $H$는 $logN$이기 때문에, 합을 구하는 시간 복잡도는 $logN$이다.

첫 번째 레벨에서는 루트 노드 하나만 있고, 루트 노드는 반드시 방문하게 된다.

리프 노드가 아닌 노드는 2개의 자식을 갖고, 재귀 호출을 하는 경우 항상 2개의 호출을 하게 된다. 어떤 레벨에서 방문한 노드의 개수가 2개 이하인 경우에는 다음 레벨에서 방문한 노드의 개수는 4개 이하이다.

어떤 레벨에서 방문한 노드의 수가 3개 또는 4개인 경우에 다음 레벨에서 방문한 노드의 수가 4개 이하인지 살펴보면 된다.

레벨 $l$에서 방문한 노드가 3개이고 $l, m, r$라고 해보자. $m$은 절대로 재귀 호출을 하지 않는다. 세그먼트 트리의 모든 쿼리는 연속된 구간의 합을 구하게 되는데, $m$은 항상 부모 노드의 구간에 포함되는 노드이다. 재귀 호출이 일어났다는 것은 그 구간의 일부만 포함되어야 한다는 것을 의미하기 때문이다. 방문한 노드가 4개인 경우도 가장 왼쪽과 오른쪽에 있는 노드만 재귀 호출을 할 수 있고, 가운데 있는 노드는 재귀 호출을 하지 않는다.

따라서, 각 레벨에서 최대 4개의 노드만 방문할 수 있다.

---

## Update

`index`번째 수를 `val`로 변경하는 경우, `index`번째를 포함하는 노드에 들어있는 합만 변경해주면 된다.

원래 `index`번째 수가 `a[index]`였고, 바뀐 수가 `val`이라면, 합은 `val - a[index]`만큼 변한다.

수 변경은 다음과 같이 2가지 경우가 있다.

1. `[start, end]`에 `index`가 포함되는 경우
2. `[start, end]`에 `index`가 포함되지 않는 경우

1번 경우에만 재귀 호출을 진행하고, 2번 경우는 그 노드의 모든 자식도 `index`번째를 포함하지 않으니 재귀 호출을 중단하면 된다.

아래는 위의 설명의 소스이다.

```python
def update_tree(tree, node, start, end, index, diff):
    if index < start or index > end:
        return
    tree[node] = tree[node] + diff
    if start != end:
        update_tree(tree, node*2, start, (start+end)//2, index, diff)
        update_tree(tree, node*2+1, (start+end)//2+1, end, index, diff)

def update(a, tree, n, index, val):
    diff = val - a[index]
    a[index] = val
    update_tree(tree, 1, 0, n-1, index, diff)
```

### 다른 방법

위에서 설명한 차이를 이용한 방법 이외에 다른 방법도 있다.
먼저, 리프 노드를 찾을 때 까지 계속 재귀 호출을 이어나간다. 리프 노드를 찾으면 그 노드의 합을 변경해준다. 이후 리턴될때마다 각 노드의 합을 자식에 저장된 합을 이용해 다시 구하는 방법도 있다.

```python
def update(a, tree, node, start, end, index, val):
    if index < start or index > end:
        return
    if start == end:
        a[index] = val
        tree[node] = val
        return
    update(a, tree, node*2, start, (start+end)//2, index, val)
    update(a, tree, node*2+1, (start+end)//2+1, end, index, val)
    tree[node] = tree[node*2] + tree[node*2+1]
```

### 시간 복잡도

트리의 각 레벨에서 방문하는 노드의 개수는 2개를 넘지 않는다. 트리의 높이 $H$는 $logN$이기 때문에, 시간 복잡도는 $logN$이다.

## 원본

![[세그먼트 트리.pdf]]
