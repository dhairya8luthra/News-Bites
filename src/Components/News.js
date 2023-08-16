import React, { Component } from 'react';
import Newsitem from './Newsitem';
import Spinner from './Spinner';
import InfiniteScroll from 'react-infinite-scroll-component';



function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export class News extends Component {
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
    };
  }

  async componentDidMount() {
    this.props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=edcb980a343d4bba9719c7ae10b8656f&page=1&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setProgress(30);
    let parsedData = await data.json();
    this.props.setProgress(50);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
    this.props.setProgress(100);
  }

  handleNextClick = async () => {
    if (this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)) {
      // Handle if next page exceeds total pages
    } else {
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=edcb980a343d4bba9719c7ae10b8656f&page=${this.state.page + 1}&pagesize=${this.props.pageSize}`;
      this.setState({ loading: true });
      let data = await fetch(url);
      let parsedData = await data.json();
      this.setState({
        page: this.state.page + 1,
        articles: parsedData.articles,
        loading: false,
      });
    }
  };

  fetchMoreData = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=edcb980a343d4bba9719c7ae10b8656f&page=${this.state.page + 1}&pagesize=${this.props.pageSize}`;
  
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      page: this.state.page + 1,
      articles: this.state.articles.concat(parsedData.articles),
      loading: false,
    });
  };

  handlePreviousClick = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=edcb980a343d4bba9719c7ae10b8656f&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles,
      loading: false,
    });
  };

  render() {
    return (
      <>
        
          <h1 className='text-center my-3'>NewsBites - Top {capitalizeFirstLetter(this.props.category)} Headlines</h1>
          {this.state.loading && <Spinner></Spinner>}

          <InfiniteScroll
            dataLength={this.state.articles.length}
            next={this.fetchMoreData}
            hasMore={this.state.articles.length !== this.state.totalResults}
            loader={<Spinner></Spinner>}
          >
           <div className="container my-3">
            <div className='row my-3'>
              {this.state.articles.map((element) => {
                return (
                  <div className='col-md-4' key={element.url}>
                    <Newsitem
                      title={element.title ? (element.title.slice(0, 80).length < 66 ? element.title.slice(0, 65) + '...' : element.title) : '.....'}
                      desc={element.description ? element.description : '.....'}
                      imageurl={element.urlToImage ? element.urlToImage : 'https://thumbs.dreamstime.com/z/news-newspaper-concept-background-image-56681058.jpg?w=768'}
                      newsUrl={element.url}
                      author={element.author}
                      date={element.publishedAt}
                      source={element.source.name}
                      category={this.props.category}
                    ></Newsitem>
                  </div>
                );
              })}
            </div>
            </div> 
          </InfiniteScroll>
        
      </>
    );
  }
}

export default News;
