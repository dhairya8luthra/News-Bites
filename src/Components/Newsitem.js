import React, { Component } from 'react';

export class Newsitem extends Component {
  render() {
    let { title, desc, imageurl, newsUrl, author, date, source, category } = this.props;
    let badgeColors = {
      general: 'secondary',
      business: 'primary',
      entertainment: 'success',
      health: 'warning',
      science: 'info',
      sports: 'danger',
      technology: 'dark',
    };
    
    // Dynamically create the badge class based on the category
    let badgeClass = `badge rounded-pill bg-${badgeColors[category]}`;

    return (
      <div className='my-3'>
        <div className='card'>
          <img src={imageurl} className='card-img-top' alt='...' />
          <div className='card-body'>
            <h5 className='card-title'>{title}</h5>
            <p className='card-text'>{desc}</p>
            <span className={badgeClass}>{source}</span>
            <p className='card-text'>
              <small className='text-muted'>
                By {author ? author : 'unknown'} on{' '}
                {date ? new Date(date).toGMTString() : 'not known'}
              </small>
            </p>
            <a href={newsUrl} rel='_blank' className='btn btn-sm btn-dark'>
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Newsitem;
