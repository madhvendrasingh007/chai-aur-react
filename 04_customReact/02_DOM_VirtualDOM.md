# 📘 DOM vs Virtual DOM

## 🔹 What is the DOM?

**DOM (Document Object Model)** is the **browser's internal representation of a web page**.

* It represents the page structure as a **tree of nodes** (HTML elements).
* You can **read and manipulate** elements using JavaScript.

### 🧾 Example:

HTML:

```html
<div id="app"><h1>Hello</h1></div>
```

JavaScript:

```js
document.getElementById("app").innerHTML = "<h1>Hi</h1>";
```

This changes the content of the `div` directly in the **real DOM**.

---

## 🔸 What is the Virtual DOM?

**Virtual DOM (VDOM)** is a **lightweight copy of the real DOM**, used by frameworks like **React**.

* It is a **JavaScript object** that mimics the structure of the actual DOM.
* When changes occur:

  1. A **new Virtual DOM** is created.
  2. It’s **compared** with the previous version.
  3. Only the **differences are applied** to the real DOM.

---

## 🔁 Difference Between DOM and Virtual DOM

| Feature            | Real DOM                          | Virtual DOM                     |
| ------------------ | --------------------------------- | ------------------------------- |
| Type               | Actual browser DOM                | In-memory JS object             |
| Speed              | Slower on frequent changes        | Faster with optimized updates   |
| Updates            | Direct and complete               | Selective via diff & patch      |
| Efficiency         | Less efficient for large UIs      | More efficient and reactive     |
| Used By            | Vanilla JS, jQuery                | React, Vue (under the hood)     |
| Performance Impact | High DOM operations = slower page | Reduced DOM access = faster app |

---

## 📌 Summary

* **DOM** is what browsers use to render your page.
* **Virtual DOM** is a smart layer on top of the real DOM, used by React to:

  * Track changes efficiently
  * Apply only the needed updates
  * Improve performance and UX

---

✅ **Virtual DOM ≠ Replacing DOM** — it’s an optimization strategy to **minimize expensive real DOM operations**.
