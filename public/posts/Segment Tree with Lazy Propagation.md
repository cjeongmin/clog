---
tags:
  - data-structure
date: 2023.07.30
---

[[Segment Tree]]

---

# Segment Tree with Lazy Propagation

[[Segment Tree]]에서 `[i, j]`범위에 $v$를 더해야 할 때, 배열에다가 연산을 진행하면 $O(N)$이지만, 세그먼트 트리에서 진행하면 $O(NlogN)$으로 오히려 더 많은 시간이 걸리게 되는 문제가 있다.

세그먼트 트리에서 구간을 변경하는 함수 `update_range`를 만들어보면 아래와 같다.

```python
def update_range(tree, node, start, end, left, right, diff):
    if left > end or right < start:
        return
    if start == end:
        tree[node] += diff
        return
    update_range(tree, node*2, start, (start+end)//2, left, right, diff)
    update_range(tree, node*2+1, (start+end)//2+1, end, left, right, diff)
    tree[node] = tree[node*2] + tree[node*2+1]
```

`update_range`함수는 `left`번째부터 `right`번째 수 까지 `diff`를 더하는 소스이다.

리프 노드를 찾아 `diff`를 더하고, 리프 노드가 아닌 나머지 노드가 저장하는 합도 변경한다.

효율적으로 보이지만, 모든 수를 변경해야 하면 모든 노드를 다 변경해야 한다. 따라서, 시간 복잡도는 $O(NlogN)$이다.

느리게 갱신되는 세그먼트 트리를 사용하면 구간 변경을 효율적으로 수행할 수 있다.

## 변경해야 하는 노드

![[Pasted image 20230730123202.png]]

위는 `[left, right] = [3, 7]`인 경우 변경해야 하는 노드이다.

`[3, 4]`, `[5, 7]`을 루트로하는 서브트리는 모든 노드에 들어있는 합을 변경해야 한다. 이런 경우, 서브트리로 있는 노드는 나중에 다시 변경을 수행하러 그 노드에 방문했을 때 변경을 진행해도 된다.

## Lazy

나중에 변경해야 하는 값을 `lazy[i]`에 저장한다.

`[3, 4]`의 합을 저장하는 노드의 `lazy[i]`에 10이 저장되어 있다면, $A[3]$, $A[4]$에 10을 더해야 하는데, 나중에 10을 더하겠다는 의미를 갖는다.

전체적인 코드는 아래와 같다.

```python
import math

def init(a, tree, node, start, end):
    if start == end:
        tree[node] = a[start]
    else:
        init(a, tree, node*2, start, (start+end)//2)
        init(a, tree, node*2+1, (start+end)//2+1, end)
        tree[node] = tree[node*2] + tree[node*2+1]


def update_lazy(tree, lazy, node, start, end):
    if lazy[node] != 0:
        tree[node] += (end-start+1)*lazy[node]
        if start != end:
            lazy[node*2] += lazy[node]
            lazy[node*2+1] += lazy[node]
        lazy[node] = 0


def update_range(tree, lazy, node, start, end, left, right, diff):
    update_lazy(tree, lazy, node, start, end)
    if left > end or right < start:
        return
    if left <= start and end <= right:
        tree[node] += (end-start+1)*diff
        if start != end:
            lazy[node*2] += diff
            lazy[node*2+1] += diff
        return
    update_range(tree, lazy, node*2, start, (start+end)//2, left, right, diff)
    update_range(tree, lazy, node*2+1, (start+end)//2+1, end, left, right, diff)
    tree[node] = tree[node*2] + tree[node*2+1]


def query(tree, lazy, node, start, end, left, right):
    update_lazy(tree, lazy, node, start, end)
    if left > end or right < start:
        return 0
    if left <= start and end <= right:
        return tree[node]
    lsum = query(tree, lazy, node*2, start, (start+end)//2, left, right)
    rsum = query(tree, lazy, node*2+1, (start+end)//2+1, end, left, right)
    return lsum + rsum


h = math.ceil(math.log2(n))
tree_size = 1 << (h+1)
tree = [0] * tree_size
lazy = [0] * tree_size
init(a, tree, 1, 0, n-1)
```

## 시간 복잡도

수를 변경할 때 방문하는 노드는 합을 구할 때 방문하는 노드와 같다. 따라서, 두 연산 모두 $O(logN)$ 이다.

## 원본

![[느리게 갱신되는 세그먼트 트리.pdf]]
