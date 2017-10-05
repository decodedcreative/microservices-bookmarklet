var microdata = {};

microdata.bookmarklet = (function (){

	var

	createMicroDataTable = function(){

		// Find the first instance of Product microdata itemtype on the page
		var
		product = document.querySelector('[itemtype="http://schema.org/Product"]'),

		// Search within it for elements with 'itemprop' attribute
		itemProps = product.querySelectorAll('[itemprop]'),

		tableWrapper = document.createElement("DIV"),

		// Create a table
		tableNode = document.createElement("TABLE");

		// Insert table into wrapping DIV
		tableWrapper.appendChild(tableNode);

		tableNode.classList.add("microdata-table");

		tableNode.innerHTML = createTableContent(itemProps);

		Object.assign(tableWrapper.style,
			{
				fontSize:"12px",
				backgroundColor:"#CCCCCC",
				color:"#000000",
				textAlign:"left",
				position: "fixed",
				bottom: "0",
				right: "0",
				zIndex: "99999999",
				maxWidth: "400px",
				maxHeight: "400px",
				padding: "10px",
				verticalAlign: "top",
				overflow: "auto"
			}
		);

		Object.assign(tableNode.style,
			{
				borderCollapse: "separate",
				borderSpacing: "20px"
			}
		);

		// Add the table to the DOM
		document.body.appendChild(tableWrapper);

	},

	createTableContent = function(itemProps){

		var
		tableInnerHTML = '';

		itemProps.forEach(function(itemProp){

			tableInnerHTML += "<tr><th>"+itemProp.attributes.itemprop.value+"</th>";
			tableInnerHTML += "<td>"+itemProp.innerText+"</td>";

		});

		return tableInnerHTML;

	}

	return{
		init: function () {
			createMicroDataTable();
		}
	};

}());

microdata.bookmarklet.init();