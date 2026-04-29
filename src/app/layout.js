import "./globals.css";


export default function RootLayout({ children }) {
	return (
		<html lang="en">
            		<body className="wrapper">
	    			<div className="layout">
            				{children}
          			</div>
	    		</body>
        	</html>
    	);
}
