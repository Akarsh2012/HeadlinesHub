import React from "react";
import "./Cardcontainer.css";

const NewsItemComponent = (props) => {
  const { title, description, imageUrl, newsUrl, author, date, source } = props;

  return (
    <div className="my-3">
      <div className="card-container shadow mb-5 bg-body rounded">
        <div className="badge-box">
          <span className="badge rounded-pill bg-danger">{source}</span>
        </div>
        <img
          src={imageUrl}
          style={{ height: "10rem", objectFit: "cover" }}
          alt="news-thumbnail"
        />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}...</p>
          <p className="card-text" style={{ marginTop: 0 }}>
            <small className="text-muted">
              By {author} on {new Date(date).toGMTString()}
            </small>
          </p>
          <a
            rel="noreferrer"
            href={newsUrl}
            target="_blank"
            className="btn btn-sm btn-dark read-more-btn"
          >
            Read More
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewsItemComponent;

// import React, { Component } from "react";
// import "./Cardcontainer.css";

// export class NewsItemComponent extends Component {
//   render() {
//     let { title, description, imageUrl, newsUrl, author, date, source } =
//       this.props;
//     return (
//       <div className="my-3">
//         <div className="card-container shadow   mb-5 bg-body rounded">
//          <div className="badge-box"> <span className="badge rounded-pill bg-danger">{source}</span></div>
//           <img
//             src={imageUrl}
//             style={{ height: "10rem", objectFit: "cover" }}
//             alt="..."
//           />
//           <div className="card-body">
//             <h5 className="card-title">{title}</h5>
//             <p className="card-text">{description}...</p>
//             <p className="card-text" style={{ marginTop: 0 }}>
//               <small className="text-muted">
//                 By {author} on {new Date(date).toGMTString()}
//               </small>
//             </p>
//             <a
//               rel="noreferrer"
//               href={newsUrl}
//               target="_blank"
//               className="btn btn-sm btn-dark read-more-btn"
//             >
//               Read More
//             </a>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// export default NewsItemComponent;
