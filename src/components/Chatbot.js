import React, { useState, useEffect } from 'react';
import { getWebsites, crawlWebsite, processContent } from '../api';
import './Chatbot.css'; 


function Chatbot() {
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [websites, setWebsites] = useState([]);
  const [selectedWebsite, setSelectedWebsite] = useState('');
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [crawlError, setCrawlError] = useState('');

  // Fetch websites data for dropdown
  useEffect(() => {
    const fetchWebsites = async () => {
      try {
        const { data } = await getWebsites();
        console.log('Fetched websites:', data);  // Debug log
        setWebsites(data);
      } catch (error) {
        console.error('Failed to fetch websites:', error);
      }
    };

    fetchWebsites();
  }, []);

  // Handle website crawling
  const handleCrawlWebsite = async () => {
    try {
      setCrawlError('');  // Reset error message before crawling
      await crawlWebsite(websiteUrl);
      alert('Website crawled successfully!');
      // Refresh the list of websites after crawling
      const { data } = await getWebsites();
      setWebsites(data);
    } catch (error) {
      console.error('Failed to crawl website:', error);
      setCrawlError('Failed to crawl the website.');
    }
  };

  // Handle submitting a query to the AI
  const handleSubmitQuery = async (e) => {
    e.preventDefault();
    try {
      const { data } = await processContent(selectedWebsite, query);
      setResponse(data.response);
    } catch (error) {
      console.error('Failed to process query:', error);
    }
  };

  return (
    <div>
      <h1>Web Crawler & Chatbot System</h1>

      {/* Web Crawler Section */}
      <div className="mb-4">
        <h2>Crawl Website</h2>
        <input
          type="text"
          className="form-control"
          placeholder="Enter website URL"
          value={websiteUrl}
          onChange={(e) => setWebsiteUrl(e.target.value)}
        />
        <button className="btn btn-primary mt-2" onClick={handleCrawlWebsite}>
          Crawl Website
        </button>
        {crawlError && <p style={{ color: 'red' }}>{crawlError}</p>}
      </div>

      {/* Chatbot Section */}
      <div className="mb-4">
        <h2>Ask a Question</h2>
        <select
          className="form-control mb-2"
          value={selectedWebsite}
          onChange={(e) => setSelectedWebsite(e.target.value)}
        >
          <option value="">Select a website</option>
          {websites.map((website) => (
            <option key={website._id} value={website._id}>
              {website.url}
            </option>
          ))}
        </select>
        <form onSubmit={handleSubmitQuery}>
          <div className="form-group">
            <label>Query:</label>
            <input
              type="text"
              className="form-control"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary mt-2">
            Submit
          </button>
        </form>
        {response && (
          <div className="mt-4">
            <h3>Response:</h3>
            <p>{response}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Chatbot;


