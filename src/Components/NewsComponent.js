import React, { useState, useEffect, useCallback } from "react";
import NewsItemComponent from "./NewsItemComponent";
import Spinner from "./Spinner";
import PropTypes from "prop-types";

const NewsComponent = ({
  country = "in",
  pageSize = 8,
  category = "general",
  pageTitle,
  setProgress,
}) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  // Wrap fetchNews in useCallback to avoid re-creation on every render
  const fetchNews = useCallback(async () => {
    if (page === 1) setProgress(10);

    const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=9c0c08772cbd41b780623385709fde7f&page=${page}&pageSize=${pageSize}`;

    setLoading(true);

    try {
      const response = await fetch(url);
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();

      if (page === 1) setProgress(30);

      setArticles((prevArticles) => prevArticles.concat(data.articles));
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }

    if (page === 1) setProgress(100);
  }, [page, country, category, pageSize, setProgress]);

  // Fetch news when component mounts or page changes
  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  // Handle scroll event
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.title = pageTitle;
  }, [pageTitle]);

  return (
    <div className="container my-3">
      {/* Main heading */}
      <h1
        className="text-center"
        style={{
          margin: "40px 0px",
          marginTop: "90px",
          fontSize: "2.5rem", // Font size for emphasis
          fontWeight: "700", // Bold font
          color: "#1a1a1a", // Strong color
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)", // Subtle text shadow
          borderBottom: "3px solid #ff6600", // Underline with colored border
          paddingBottom: "10px", // Padding below the underline
        }}
      >
        United States' - Top Headlines
        {/* Conditionally display category */}
        {pageTitle !== "Home-HeadlinesHub" &&
          ` on ${
            category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()
          }`}
      </h1>

      <div className="row">
        {/* Iterate over articles and render each one */}
        {articles.map((element, index) => (
          <div key={element.url ? `${element.url}-${index}` : index} className="col-md-4 mb-4">
            <NewsItemComponent
              title={element.title || ""} // News title
              description={
                element.description ? element.description : ""
              } // Truncated description
              imageUrl={
                element.urlToImage ||
                "https://ichef.bbci.co.uk/news/1024/branded_news/139a/live/57005b50-6a6f-11ef-8089-6fa3f23ee0d2.jpg"
              } // News image or fallback
              newsUrl={element.url} // News article URL
              author={element.author || "Unknown"} // News author
              date={element.publishedAt} // Publication date
              source={element.source.name || "Unknown"} // News source
            />
          </div>
        ))}
      </div>

      {/* Show loading spinner */}
      {loading && <Spinner />}
    </div>
  );
};

// Prop types validation
NewsComponent.propTypes = {
  country: PropTypes.string, // Country code as string
  pageSize: PropTypes.number, // Number of articles per page
  category: PropTypes.string, // News category as string
  pageTitle: PropTypes.string.isRequired, // Page title as string
  setProgress: PropTypes.func.isRequired, // Function to update progress
};

export default NewsComponent;

// code based on Class based Components
// import React, { Component } from "react";
// import NewsItemComponent from "./NewsItemComponent";
// import Spinner from "./Spinner";
// import PropTypes from "prop-types";

// export class NewsComponent extends Component {
//   // Default props to ensure fallback values are set for country, pageSize, and category
//   static defaultProps = {
//     country: "in", // Default country code set to India
//     pageSize: 8, // Default number of articles per page
//     category: "general", // Default category set to 'general'
//   };

//   // Prop types for validating the props passed to the component
//   static propTypes = {
//     country: PropTypes.string, // Prop type for country code
//     pageSize: PropTypes.number, // Prop type for the number of articles per page
//     category: PropTypes.string, // Prop type for news category
//   };

//   // Initial state setup
//   state = {
//     articles: [], // Array to store fetched articles
//     loading: false, // Boolean to indicate loading state
//     page: 1, // Current page number for pagination
//     totalResults: 0, // Total number of results from the API
//   };

//   // Fetch the news articles when the component is mounted
//   componentDidMount() {
//     this.fetchNews(); // Fetch initial news data
//     window.addEventListener("scroll", this.handleScroll); // Add scroll event listener for infinite scrolling
//   }

//   // Clean up the event listener when the component is unmounted to avoid memory leaks
//   componentWillUnmount() {
//     window.removeEventListener("scroll", this.handleScroll); // Remove scroll event listener
//   }

//   // Fetch news articles from the API based on the current page, country, and category
//   fetchNews = async () => {
//     const { country, category, pageSize } = this.props;
//     const { page, articles } = this.state;

//     // Only set progress bar when fetching initial articles, i.e., on the first page
//     if (page === 1) {
//       this.props.setProgress(10);
//     }

//     // Construct the API URL with appropriate parameters
//     const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=9c0c08772cbd41b780623385709fde7f&page=${page}&pageSize=${pageSize}`;

//     this.setState({ loading: true }); // Set loading state to true before starting the fetch

//     try {
//       const response = await fetch(url); // Fetch data from the API
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`); // Handle HTTP errors
//       }
//       const data = await response.json(); // Parse the JSON response

//       // Only set progress when it's the first page
//       if (page === 1) {
//         this.props.setProgress(30);
//       }

//       // Update the state with fetched articles and pagination info
//       this.setState({
//         articles: articles.concat(data.articles), // Append new articles to the existing list
//         totalResults: data.totalResults, // Update the total number of results
//         loading: false, // Set loading state to false after data is fetched
//       });
//     } catch (error) {
//       console.error("Error fetching data:", error); // Log any errors that occur during fetch
//       this.setState({ loading: false }); // Set loading to false even if an error occurs
//     }

//     // Only set progress to 100 when it's the first page
//     if (page === 1) {
//       this.props.setProgress(100);
//     }
//   };

//   // Handle scrolling event to implement infinite scrolling
//   handleScroll = () => {
//     // Check if the user has scrolled near the bottom of the page
//     if (
//       window.innerHeight + document.documentElement.scrollTop + 1 >=
//       document.documentElement.scrollHeight
//     ) {
//       // Update the page number in the state and fetch more articles
//       this.setState(
//         (prevState) => ({ page: prevState.page + 1 }), // Increment the page number
//         this.fetchNews // Fetch more articles after updating the page
//       );
//     }
//   };

//   render() {
//     const { articles, loading } = this.state; // Destructure articles and loading from state
//     const { category, pageTitle } = this.props; // Destructure category from props
//     document.title = pageTitle; // Set document title based on the pageTitle

//     return (
//       <div className="container my-3">
//         {/* Main heading of the news app */}
//         <h1
//           className="text-center"
//           style={{
//             margin: "40px 0px",
//             marginTop:"90px",
//             fontSize: "2.5rem", // Increased font size for prominence
//             fontWeight: "700", // Bold font weight to make it stand out
//             color: "#1a1a1a", // Darker color for a strong appearance
//             textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)", // Subtle text shadow for depth
//             borderBottom: "3px solid #ff6600", // Underline with a colored border
//             paddingBottom: "10px", // Padding to separate the underline from the text
//           }}
//         >
//           NewsMonkey - Top Headlines
//           {/* Conditionally render the category if it's not 'general' */}
//           {pageTitle !== "Home-MyNews-App" &&
//             ` on ${
//               category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()
//             }`}
//         </h1>

//         <div className="row">
//           {/* Iterate over articles and render each one as a card */}
//           {articles.map((element, index) => (
//             <div key={element.url || index} className="col-md-4 mb-4">
//               {/* Use col-md-4 to display 3 cards per row and adjust their widths to cover the space */}
//               <NewsItemComponent
//                 title={element.title || ""} // Display the title of the news item
//                 description={
//                   element.description ? element.description.slice(0, 95) : ""
//                 } // Display a truncated description of the news item
//                 imageUrl={
//                   element.urlToImage ||
//                   "https://ichef.bbci.co.uk/news/1024/branded_news/139a/live/57005b50-6a6f-11ef-8089-6fa3f23ee0d2.jpg"
//                 } // Display the news image or a fallback image if none is available
//                 newsUrl={element.url} // URL of the full news article
//                 author={element.author || "Unknown"} // Display the author or 'Unknown' if not available
//                 date={element.publishedAt} // Display the publication date of the news item
//                 source={element.source.name || "Unknown"} // Display the source of the news item
//               />
//             </div>
//           ))}
//         </div>

//         {/* Display a loading spinner when more articles are being fetched */}
//         {loading && <Spinner />}
//       </div>
//     );
//   }
// }

// export default NewsComponent;

// Without Infinite Scroller:(code)
// import React, { Component } from "react";
// import NewsItemComponent from "./NewsItemComponent";
// import Spinner from "./Spinner";
// import PropTypes from "prop-types";

// // Define default images for different categories of news
// // These images will be used if a news article doesn't have an associated image

// export class NewsComponent extends Component {
//   // Default props to ensure there are fallback values for country, pageSize, and category
//   static defaultProps = {
//     country: "in", // Default to India as country code
//     pageSize: 8, // Display 8 news articles per page
//     category: "general", // General is the default news category
//   };

//   // Prop types ensure proper data types are passed to the component
//   static propTypes = {
//     country: PropTypes.string, // Country code for news
//     pageSize: PropTypes.number, // Number of articles per page
//     category: PropTypes.string, // Category of the news (general, business, etc.)
//   };

//   // Initial state setup
//   state = {
//     articles: [], // Array to store fetched articles
//     loading: false, // Boolean to indicate loading state
//     page: 1, // Current page number for pagination
//     totalResults: 0, // Total number of results from the API
//   };

//   // Once the component is mounted, fetch the news immediately
//   componentDidMount() {
//     this.fetchNews(); // Call the method to fetch the news
//   }

//   // Method to fetch news articles from the API
//   fetchNews = async (page = this.state.page) => {
//     const { country, category, pageSize } = this.props;
//     // API endpoint with country, category, and page parameters
//     const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=9c0c08772cbd41b780623385709fde7f&page=${page}&pageSize=${pageSize}`;

//     this.setState({ loading: true }); // Set loading state to true before fetch

//     try {
//       const response = await fetch(url); // Fetch news from the API
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
//       const data = await response.json(); // Parse the JSON response

//       // Update the state with the fetched articles and other info
//       this.setState({
//         articles: data.articles, // Store articles from the API response
//         totalResults: data.totalResults, // Total number of results from the API
//         loading: false, // Set loading to false
//         page, // Keep track of the current page
//       });
//     } catch (error) {
//       console.error("Error fetching data:", error); // Handle any error during fetch
//       this.setState({ loading: false }); // Stop loading even in case of error
//     }
//   };

//   // Method to handle pagination (going to next or previous page)
//   handlePageChange = (direction) => {
//     const newPage =
//       direction === "next" ? this.state.page + 1 : this.state.page - 1; // Determine new page
//     this.fetchNews(newPage); // Fetch news for the new page
//   };

//   render() {
//     const { articles, loading, page, totalResults } = this.state;
//     const { pageSize, category } = this.props;
//     document.title=`${category.charAt(0).toUpperCase()+category.slice(1)}-MyNews-App`;

//     return (
//       <div className="container my-3">
//         <h1 className="text-center" style={{ margin: "40px 0px" }}>
//           NewsMonkey - Top Headlines
//           {/* Conditionally render category if it's not 'general' */}
//           {category !== "general" &&
//             ` on ${
//               category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()
//             }`}
//         </h1>

//         {/* Display spinner while loading */}
//         {loading && <Spinner />}

//         <div className="row">
//           {/* Display each news article in a grid if not loading */}
//           {!loading &&
//             articles.map((element) => (
//               <div key={element.url} className="col-md-3">
//                 <NewsItemComponent
//                   title={element.title || ""} // Display title if available
//                   description={
//                     element.description ? element.description.slice(0, 95) : ""
//                   } // Truncate description to 95 characters
//                   // Use image from the article or fall back to default image based on category
//                   imageUrl={
//                     element.urlToImage ||
//                     "https://ichef.bbci.co.uk/news/1024/branded_news/139a/live/57005b50-6a6f-11ef-8089-6fa3f23ee0d2.jpg"
//                   }
//                   newsUrl={element.url} // Link to the full news article
//                   author={element.author || "Unknown"} // Display author or 'Unknown'
//                   date={element.publishedAt} // Display published date
//                   source={element.source.name || "Unknown"} // Display source name or 'Unknown'
//                 />
//               </div>
//             ))}
//         </div>

//         {/* Pagination buttons */}
//         <div className="container d-flex justify-content-between">
//           {/* 'Previous' button is disabled if on the first page */}
//           <button
//             disabled={page <= 1}
//             type="button"
//             className="btn btn-dark"
//             onClick={() => this.handlePageChange("prev")}
//           >
//             &larr; Previous
//           </button>
//           {/* 'Next' button is disabled if the last page is reached */}
//           <button
//             disabled={page + 1 > Math.ceil(totalResults / pageSize)}
//             type="button"
//             className="btn btn-dark"
//             onClick={() => this.handlePageChange("next")}
//           >
//             Next &rarr;
//           </button>
//         </div>
//       </div>
//     );
//   }
// }

// export default NewsComponent;

// older code
// import React, { Component } from "react";
// import NewsItemComponent from "./NewsItemComponent";
// import Spinner from "./Spinner";
// import PropTypes from "prop-types";

// export class NewsComponent extends Component {
//   static defaultProps = {
//     country: "in",
//     pageSize: 8,
//     category: "general",
//   };

//   static propTypes = {
//     country: PropTypes.string,
//     pageSize: PropTypes.number,
//     category: PropTypes.string,
//   };
//   constructor() {
//     super();
//     console.log("Hello I am a Constructor from News Component");
//     this.state = {
//       articles: [],
//       loading: false,
//       page: 1,
//     };
//   }
//   async componentDidMount() {
//     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9c0c08772cbd41b780623385709fde7f&page=1&pageSize=${this.props.pageSize}`;
//     this.setState({ loading: true });
//     try {
//       let response = await fetch(url);
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
//       let data = await response.json();
//       console.log(data);

//       this.setState({
//         articles: data.articles,
//         totalResults: data.totalResults,
//         loading: false,
//       });
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   }
//   handleNextClick = async () => {
//     console.log("Next");
//     if (
//       this.state.page + 1 >
//       Math.ceil(this.state.totalResults / this.props.pageSize)
//     ) {
//     } else {
//       let url = `https://newsapi.org/v2/top-headlines?country=${
//         this.props.country
//       }&category=${
//         this.props.category
//       }&apiKey=9c0c08772cbd41b780623385709fde7f&page=${
//         this.state.page + 1
//       }&pageSize=${this.props.pageSize}`;
//       this.setState({ loading: true });
//       try {
//         let response = await fetch(url);
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         let data = await response.json();

//         this.setState({
//           articles: data.articles,
//           page: this.state.page + 1,
//           loading: false,
//         });
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     }
//   };
//   handlePreviousClick = async () => {
//     console.log("Previous");
//     let url = `https://newsapi.org/v2/top-headlines?country=${
//       this.props.country
//     }&category=${
//       this.props.category
//     }&apiKey=9c0c08772cbd41b780623385709fde7f&page=${
//       this.state.page - 1
//     }&pageSize=${this.props.pageSize}`;
//     this.setState({ loading: true });
//     try {
//       let response = await fetch(url);
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
//       let data = await response.json();

//       this.setState({
//         articles: data.articles,
//         page: this.state.page - 1,
//         loading: false,
//       });
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };
//   render() {
//     return (
//       <div className="container my-3">
//         <h1 className="text-center" style={{ margin: "40px 0px" }}>
//           NewsMonkey-Top Headlines{" "}
//           {this.props.category !== "general"
//             ? `on ${this.props.category
//                 .charAt(0)
//                 .toUpperCase()}${this.props.category.slice(1).toLowerCase()}`
//             : ""}
//         </h1>
//         {this.state.loading && <Spinner />}
//         <div className="row">
//           {!this.state.loading &&
//             this.state.articles.map((element) => {
//               return (
//                 <div key={element.url} className="col-md-3 ">
//                   <NewsItemComponent
//                     title={element.title ? element.title : ""}
//                     description={
//                       element.description
//                         ? element.description.slice(0, 95)
//                         : ""
//                     }
//                     imageUrl={
//                       element.urlToImage
//                         ? element.urlToImage
//                         : "https://ichef.bbci.co.uk/news/1024/branded_news/139a/live/57005b50-6a6f-11ef-8089-6fa3f23ee0d2.jpg"
//                     }
//                     newsUrl={element.url}
//                     author={element.author?element.author:"Unknown"}
//                     date={element.publishedAt}
//                     source={element.source.name?element.source.name:"Unknown"}
//                   />
//                 </div>
//               );
//             })}
//         </div>
//         <div className="container d-flex justify-content-between">
//           <button
//             disabled={this.state.page <= 1}
//             type="button"
//             className="btn btn-dark"
//             onClick={this.handlePreviousClick}
//           >
//             &larr; Previous
//           </button>
//           <button
//             disabled={
//               this.state.page + 1 >
//               Math.ceil(this.state.totalResults / this.props.pageSize)
//             }
//             type="button"
//             className="btn btn-dark"
//             onClick={this.handleNextClick}
//           >
//             Next &rarr;
//           </button>
//         </div>
//       </div>
//     );
//   }
// }

// export default NewsComponent;
