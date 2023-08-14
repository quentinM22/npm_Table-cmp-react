
# @quentinm22/table-cmp-react

PACKAGE table


## Installation

Install Package in React project

```bash
  npm i @quentinm22/table-cmp-react

  yarn add @quentinm22/table-cmp-react
```
    
### Update

```bash
  npm i @quentinm22/table-cmp-react@latest

  yarn add @quentinm22/table-cmp-react@latest
```

## Usage/Examples

```javascript
import {Table} from '@quentinm22/table-cmp-react'

function App() {
	const [tableEmployee, setTableEmployee] = useState([])
	const [attributes, setAttributes] = useState([])
	const [dataTest, setDataTest] = useState(false)

  const mockData = [{
		
		"firstName": "John",
		"lastName": "Doe",
		"startDate": "2022-01-01",
		"department": "Marketing",
		"dateOfBirth": "1990-05-15",
		"street": "123 Main St",
		"city": "New York",
		"state": "NY",
		"zipCode": "10001"
	},
	{
		"firstName": "Jane",
		"lastName": "Smith",
		"startDate": "2021-07-15",
		"department": "Human Resources",
		"dateOfBirth": "1985-12-10",
		"street": "456 Elm St",
		"city": "Los Angeles",
		"state": "CA",
		"zipCode": "90001"
	},
	{
		"firstName": "Michael",
		"lastName": "Johnson",
		"startDate": "2020-03-10",
		"department": "Finance",
		"dateOfBirth": "1978-09-20",
		"street": "789 Oak St",
		"city": "Chicago",
		"state": "IL",
		"zipCode": "60601"
	}]

	useEffect(() => {
		let arrayAllEmployee = []
		let attributesFilter = ["firstName", "lastName"]
		if (dataTest) {
			mockData.map((data) => arrayAllEmployee.push(data))
		}
		setTableEmployee(arrayAllEmployee)
		setAttributes(attributesFilter)
	}, [dataTest])
	return (
		<div
			style={{
				padding: "150px",
			}}
		>
			<label>MockData</label>
			<input type="checkbox" onChange={() => setDataTest(!dataTest)} />
			<Table
				title="Current Employees"
				arrayElement={tableEmployee}
				attributes={attributes}
				colorPrimary="#0a3d62"
				colorSecondary="#60a3bc"
			/>
		</div>
	)
}
```


| Props  | Value |
| ------------- | ------------- |
| title  | string  |
| arrayElement  | array => object  |
|  attribute  | array => string (name of attributes for search input)  |
| colorPrimary  | string => color hexa  |
| colorSecondary  | string => color hexa  |

## Authors

- [@quentinM22](https://github.com/quentinM22)

