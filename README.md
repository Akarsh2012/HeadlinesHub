# Headlines Hub

**Headlines Hub** is a news aggregation application built using **React.js**, designed to deliver the latest top headlines and breaking news from various sources. With features like category filtering and real-time updates, it provides users with a seamless experience to stay informed.

## Demo
The API provider did not allow for free deployment. So here is the demo video link: [Demo Video](https://drive.google.com/file/d/19NZa726rbiizM1Yl9K_dU7kNQUfoy3jm/view?usp=drive_link).

**Deployed link**: [Headlines Hub](https://headlines-hub-by-akarsh-singh.netlify.app/) (Note: You will not be able to see any articles due to restrictions provided by the API provider).

## Features
- **Real-time News Updates**: Fetches the latest headlines from various news sources.
- **Category Filtering**: Allows users to filter news by categories such as Sports, Technology, Health, etc.
- **Responsive Design**: Fully responsive layout for optimal viewing on different devices.
- **User-friendly Interface**: Clean and intuitive UI for a smooth user experience.

## Technologies Used
- **React.js**: Frontend framework for building user interfaces.
- **Fetch API**: For making HTTP requests to fetch news articles from APIs.
- **CSS**: For styling the application and ensuring a responsive design.
- **React Router**: For handling navigation within the application.
  
## Project Structure
 ├── public/ # Public assets ├── src/ │ ├── components/ # React components │ ├── pages/ # Different pages of the application │ ├── App.js # Main application file │ ├── index.js # Entry point of the application │ └── styles.css # CSS styles └── package.json # Project metadata and dependencies

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Akarsh2012/HeadlinesHub.git
   cd HeadlinesHub
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:

   - Obtain your API key from News API and create a .env file in the root directory with the following content:
   ```bash
      REACT_APP_NEWS_API_KEY=your_api_key_here
    ```
## Run the Project
   ```bash
   npm start
```
## Usage
- Access the application at: [Headlines Hub](https://headlines-hub-by-akarsh-singh.netlify.app/)
- Use the category filter to view news articles based on your interests.

## Future Improvements
- Search Functionality: Allow users to search for specific news articles or topics.
- Dark Mode Toggle: Implement a dark mode option to switch between light and dark themes.
- User Accounts: Create user accounts for personalized news feeds and bookmarks.
- Speech-to-Text News Reader: Add an option to listen to the news articles using text-to-speech functionality.
- Offline Mode for Cached News: Implement an offline mode where users can still read recently viewed articles even if there is no internet connection.(using Service Workers to cache articles locally )

## Contributing
- Contributions are welcome! Please fork the repository and submit a pull request.

   
