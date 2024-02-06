# Kanban Board Frontend Project

This project is a simple Kanban board frontend application designed to help users organize their tasks using the Kanban methodology. The primary goal of this project was to learn about working with local storage in web applications, implementing drag-and-drop functionality and utilizing [Pico.css Framework](https://picocss.com/). The app is fully responsive and works well on mobile devices including drag-and-drop thanks to [DragDropTouch](https://bernardo-castilho.github.io/DragDropTouch/). I built this independently, referring only to available documentation and MDN. No step by step tutorials.

## Features

- **Drag-and-Drop:** Users can easily move tasks between different stages (columns) by dragging and dropping them.
- **Local Storage:** Tasks are saved locally in the browser's storage, allowing users to persist their tasks even after closing the browser.

## Technologies used

- **HTML:** Structuring the web page.
- **[Pico.css Framework](https://picocss.com/):** Minimal CSS Framework for semantic HTML.
- **CSS:** Styling the user interface.
- **JavaScript:** Implementing the functionality of the Kanban board, including drag-and-drop and local storage functionalities.
- **[DragDropTouch](https://bernardo-castilho.github.io/DragDropTouch/):** Polyfill that enables HTML5 drag drop support on mobile (touch) devices.

## How to Use

- **Adding Tasks:** Enter the task details and click on the "+ Add" button or press enter to save.
- **Moving Tasks:** Drag a task card from one column to another to change its status.
- **Editing Tasks:** Double-click on a task to edit its details.
- **Deleting Tasks:** Double-click on a task and delete all the text to remove it from the board.