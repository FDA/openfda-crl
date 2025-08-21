import React from "react"
import { GovBanner } from "@trussworks/react-uswds";
import { Link } from "gatsby"
import fdaLogo from "../images/gov-fda-new-white.svg";
import hhsLogo from "../images/l_HHS_white.png";

import '../css/index.scss'
import '../css/components/Layout.scss'

const pageStyles = {
  color: "#232129",
  fontFamily: "Source Sans Pro,sans-serif",
}

const links: Array<Object> = [
  {
    txt: 'FDA Home',
    url: 'https://www.fda.gov/',
  },
  {
    txt: 'Accessibility',
    url: 'https://www.fda.gov/about-fda/about-website/internet-accessibility',
  },
  {
    txt: 'Careers',
    url: 'https://www.fda.gov/about-fda/jobs-and-training-fda',
  },
  {
    txt: 'FDA Basics',
    url: 'https://www.fda.gov/about-fda/transparency/fda-basics',
  },
  {
    txt: 'FOIA',
    url: 'https://www.fda.gov/regulatory-information/freedom-information',
  },
  {
    txt: 'No Fear Act',
    url: 'https://www.fda.gov/about-fda/jobs-and-training-fda/no-fear-act',
  },
  {
    txt: 'Transparency',
    url: 'https://www.fda.gov/about-fda/transparency',
  },
  {
    txt: 'Website Policies',
    url: 'https://www.fda.gov/about-fda/about-website/website-policies'
  },
  {
    txt: 'Vulnerability Disclosure Policy',
    url: 'https://www.hhs.gov/vulnerability-disclosure-policy/index.html'
  },
  {
    txt: 'Privacy Policy',
    url: 'https://www.fda.gov/about-fda/about-website/website-policies#privacy'
  },
  {
    txt: 'openFDA Terms of Service',
    url: '/terms',
  },
  {
    txt: 'License',
    url: 'https://open.fda.gov/license'
  },
  {
    txt: 'Email the openFDA team',
    url: 'mailto:open@fda.hhs.gov',
  }
]


export default function Layout({ children }) {
  return (
    <main style={pageStyles}>
      <div>
        <GovBanner/>
        <div className='banner-main menu-shadow bg-dark-blue'>
          <div className='container clr-white smallest blue-nav-bar'>
            <a
              href='https://www.fda.gov/'
              className='fda-logo'
              rel='noopener noreferrer'
              target='_blank'
              style={{
                verticalAlign: 'text-top'
              }}>
              <img
                alt='Go to FDA website'
                width='180px'
                src={fdaLogo}
              />
            </a>
            <div className='hhs'>
              <a
                className='clr-white'
                href='http://www.hhs.gov/'
                rel='noopener noreferrer'
                target='_blank'>
                <img
                  className='absolute top'
                  style={{
                    left: '-21px',
                    position: 'absolute'
                  }}
                  alt='Go to HHS website'
                  src={hhsLogo}
                />
                U.S. Department of Health and Human Services
              </a>
              <strong>Food and Drug Administration</strong>
            </div>
          </div>
        </div>
        {/*<div className='flex' style={{borderBottom: '3px solid #222c67'}}>
          <div className='nav-header bg-primary'>
            <div>
              <Link className='clr-white nav-button' to='/'>Animal Drug Labeling and Adverse Events</Link>
            </div>
          </div>
          <div className='bg-muted-white nav-links'>
            <div className='bg-primary-light height-full display-flex flex-align-center'>
              <span className='clr-white'>Search By:</span>
            </div>
            <Link className='height-full flex-1 padding-2 clr-black nav-button'
                  activeClassName="nav-active"
                  to='/labeling/'
            >
              <span>Animal Drug Labeling</span>
              <i/>
            </Link>
            <Link className='height-full flex-1 padding-2 clr-black nav-button'
                  activeClassName="nav-active"
                  to='/adverse-events/'
            >
              <span>Animal Drug Adverse Events</span>
              <i/>
            </Link>
          </div>
        </div>*/}
      </div>
      {children}
      <footer
        id='footer'
        className='bg-primary-darker position-relative row'>
        <div className='container flex just-between flex-no-wrap padding-top-3 padding-bottom-3 footer-container'>
          <ul
            aria-label='FDA address and phone number'
            className='col d-2 clr-white small footer-left'
            tabIndex={0}>
            <li className='margin-bottom-1'>
              <a href='https://www.fda.gov/'>
                <img
                  alt='Go to FDA website'
                  width='180px'
                  src={fdaLogo}
                />
              </a>
            </li>
            <li><strong>U.S. Food and Drug Administration</strong></li>
            <li>10903 New Hampshire Avenue</li>
            <li>Silver Spring, MD 20993</li>
            <li>1-888-INFO-FDA (1-888-463-6332)</li>
            <li>
              <a
                className='clr-white inline-block small'
                href='http://www.fda.gov/AboutFDA/ContactFDA/default.htm'>
                Contact FDA
              </a>
            </li>
          </ul>
          <nav
            className='d-2 m-marg-t-2'
            aria-label='FDA links'>
            <ul className='link-columns'>
              {
                links.map((item: Object, i: number) => (
                  <li
                    key={i}
                    className='margin-bottom-1'>
                    <a
                      className='clr-white inline-block small'
                      rel='noopener noreferrer'
                      target='_blank'
                      href={item.url}>
                      {item.txt}
                    </a>
                  </li>
                ))
              }
            </ul>
          </nav>
          <div className="flex-row dir-column footer-right">
            <p className='small clr-white italic'>
              Some links on this website may direct you to non-FDA locations. FDA does not endorse or guarantee the
              integrity of information on these external sites.
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}
