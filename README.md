## Dynamic Content Delivery API

API template for [Dynamic Content Delivery](https://github.com/sadorowo/dynamic-content-delivery) - HTML page that provides data to the user based on the given ID. 

## Which files am I allowed to edit?
- all files in `data` directory:
    - [config.json](data/config.json)
    - [data-source.json](data/data-source.json)

## How to use
1. Clone this repository.
2. Install Node.js and npm.
3. Install dependencies:
    ```bash
    npm install
    ```
4. Edit required files:
    1. [config.json](data/config.json):
        - edit your constants:
            1. provide your API port in `PORT` constant.
    2. [data-source.json](data/data-source.json):
        - provide your data in `DATA` constant like this:
        ```json
        {
            "id1": {
                "#name": {
                    "textContent": "John",
                    "style": {
                        "color": "red"
                    }
                }
            },
            "id2": {
                "#name": {
                    "textContent": "Anna",
                    "style": {
                        "color": "blue"
                    }
                }
            }
        }

        ```
        > Warning!
        > Do not change the structure of the `DATA` object. It must be an object with keys being IDs and values, which are objects with CSS selectors as keys and objects with DOM properties as values.
        > Make sure that your API is running on the same port as the one provided in `PORT` constant.
5. Run the API:
    ```bash
    npm start
    ```

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Authors
- [**@sadorowo**](https://github.com/sadorowo) - original author