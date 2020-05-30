import React from 'react';
import scrollTo from 'gatsby-plugin-smoothscroll';

import ResourceItem from '../Resources/resourceItem';

import '../common/Metrics/metrics.scss';

const ResourceSideMenu = () => {
  return (
    <div className="side-menu-content">
      <h2>Resources</h2>
      {/* Emergency Shelters */}
      <div className="question-div">
        <h4>Emergency Shelters</h4>
        <ul>
          <li>
            <span onClick={() => scrollTo('#kearney-center')}>
              The Kearney Center
            </span>
          </li>
          <li>
            <span onClick={() => scrollTo('#ccys-emergency-shelter')}>
              CCYS Emergency Shelter
            </span>
          </li>
          <li>
            <span onClick={() => scrollTo('#hope-community')}>
              Hope Community
            </span>
          </li>
          <li>
            <span onClick={() => scrollTo('#refuge-house')}>Refuge House</span>
          </li>
        </ul>
      </div>
      {/* Housing Services */}
      <div className="question-div">
        <h4>Housing Services</h4>
        <ul>
          <li>
            <span onClick={() => scrollTo('#brehon-house')}>Brehon House</span>
          </li>
          <li>
            <span onClick={() => scrollTo('#westgate-community')}>
              Westgate Community
            </span>
          </li>
          <li>
            <span onClick={() => scrollTo('#chelsea-house')}>
              Chelsea House
            </span>
          </li>
          <li>
            <span onClick={() => scrollTo('#ccys-transitional-shelter')}>
              CCYS Transitional Shelter
            </span>
          </li>
          <li>
            <span onClick={() => scrollTo('#living-harvest-serenity-house')}>
              The Living Harvest, Serenity House
            </span>
          </li>
          <li>
            <span
              onClick={() =>
                scrollTo('#city-walk-urban-mission-transition-home')
              }
            >
              City Walk Urban Mission Transition Home
            </span>
          </li>
          <li>
            <span onClick={() => scrollTo('#making-miracles-group-home')}>
              Making Miracles Group Home
            </span>
          </li>
          <li>
            <span onClick={() => scrollTo('#home-plate-balkin')}>
              Home Plate - Home Place at Balkin - A Place Called Home
            </span>
          </li>
          <li>
            <span onClick={() => scrollTo('#maryland-oaks')}>
              Maryland Oaks
            </span>
          </li>
          <li>
            <span onClick={() => scrollTo('#tallahassee-housing-authority')}>
              Tallahassee Housing Authority
            </span>
          </li>
        </ul>
      </div>
      {/* Housing Services for Qualified Veterans */}
      <div className="question-div">
        <h4>Housing Services for Qualified Veterans</h4>
        <ul>
          <li>
            <span onClick={() => scrollTo('#ssvf-program')}>SSVF Program</span>
          </li>
          <li>
            <span onClick={() => scrollTo('#home-front')}>Home Front</span>
          </li>
          <li>
            <span onClick={() => scrollTo('#veterans-village')}>
              Veterans Village
            </span>
          </li>
        </ul>
      </div>
      {/* Other Veterans Services */}
      <div className="question-div">
        <h4>Other Veterans Services</h4>
        <ul>
          <li>
            <span onClick={() => scrollTo('#leon-county-veteran-services')}>
              Leon County Veteran Services
            </span>
          </li>
          <li>
            <span onClick={() => scrollTo('#vet-center')}>Vet Center</span>
          </li>
        </ul>
      </div>
      {/* Food + Clothing */}
      <div className="question-div">
        <h4>Food + Clothing</h4>
        <ul>
          <li>
            <span onClick={() => scrollTo('#grace-mission')}>
              Grace Mission
            </span>
          </li>
          <li>
            <span onClick={() => scrollTo('#dcf-access-florida-program')}>
              DCF ACCESS Florida Program{' '}
            </span>
          </li>
          <li>
            <span onClick={() => scrollTo('#salvation-army')}>
              Salvation Army
            </span>
          </li>
          <li>
            <span onClick={() => scrollTo('#echo-outreach')}>
              ECHO Outreach
            </span>
          </li>
          <li>
            <span onClick={() => scrollTo('#the-living-harvest')}>
              The Living Harvest
            </span>
          </li>
          <li>
            <span onClick={() => scrollTo('#catholic-charities')}>
              Catholic Charities
            </span>
          </li>
          <li>
            <span
              onClick={() => scrollTo('#city-walk-urban-mission-thrift-store')}
            >
              City Walk Urban Mission Thrift Store
            </span>
          </li>
          <li>
            <span onClick={() => scrollTo('#good-news-outreach')}>
              Good News Outreach
            </span>
          </li>
          <li>
            <span onClick={() => scrollTo('#maraanatha-sda-church')}>
              Maranatha SDA Church
            </span>
          </li>
          <li>
            <span onClick={() => scrollTo('#jacob-chapel-baptist-church')}>
              Jacob Chapel Baptist Church
            </span>
          </li>
          <li>
            <span onClick={() => scrollTo('#redeemers-storehouse')}>
              Redeemer's Storehouse
            </span>
          </li>
          <li>
            <span onClick={() => scrollTo('#calvary-united-methodist-church')}>
              Calvary United Methodist Church
            </span>
          </li>
        </ul>
      </div>
      {/* Drop-In Centers/Outreach */}
      <div className="question-div">
        <h4>Drop-In Centers/Outreach</h4>
        <ul>
          <li>
            <span onClick={() => scrollTo('#going-places-street-outreach')}>
              Going Places Street Outreach, Drop‐In Center
            </span>
          </li>
          <li>
            <span
              onClick={() =>
                scrollTo('#good-samaritan-chapel-and-resource-center')
              }
            >
              Good Samaritan Chapel and Resource Center
            </span>
          </li>
        </ul>
      </div>
      {/* Job Training + Placement */}
      <div className="question-div">
        <h4>Job Training + Placement</h4>
        <ul>
          <li>
            <span onClick={() => scrollTo('#careersource-capital-region')}>
              CareerSource Capital Region
            </span>
          </li>
          <li>
            <span onClick={() => scrollTo('#goodwill-prosperity-center')}>
              Goodwill Prosperity Center
            </span>
          </li>
          <li>
            <span onClick={() => scrollTo('#vocational-rehabilitation')}>
              Vocational Rehabilitation
            </span>
          </li>
        </ul>
      </div>
      {/* Legal Services */}
      <div className="question-div">
        <h4>Legal Services</h4>
        <ul>
          <li>
            <span onClick={() => scrollTo('#legal-services-north-florida')}>
              Legal Services of North Florida
            </span>
          </li>
        </ul>
      </div>
      {/* Financial Assistance */}
      <div className="question-div">
        <h4>Financial Assistance</h4>
        <ul>
          <li>
            <span onClick={() => scrollTo('#capital-area-community-action')}>
              Capital Area Community Action
            </span>
          </li>
          <li>
            <span onClick={() => scrollTo('#catholic-charities')}>
              Catholic Charities
            </span>
          </li>
          <li>
            <span onClick={() => scrollTo('#homeless-prevention')}>
              Homeless Prevention
            </span>
          </li>
        </ul>
      </div>
      {/* Mental Health + Medical Services */}
      <div className="question-div">
        <h4>Mental Health + Medical Services</h4>
        <ul>
          <li>
            <span onClick={() => scrollTo('#apalachee-center-inc')}>
              Apalachee Center, Inc
            </span>
          </li>
          <li>
            <span onClick={() => scrollTo('#the-homeless-project')}>
              The Homeless Project
            </span>
          </li>
          <li>
            <span onClick={() => scrollTo('#ability-first')}>Ability1st</span>
          </li>
          <li>
            <span onClick={() => scrollTo('#bond-community-health-center')}>
              Bond Community Health Center
            </span>
          </li>
          <li>
            <span onClick={() => scrollTo('#neighborhood-medical-center')}>
              Neighborhood Medical Center
            </span>
          </li>
          <li>
            <span
              onClick={() =>
                scrollTo('#tallahassee-veterans-administration-health-center')
              }
            >
              Tallahassee Veterans Administration Health Center
            </span>
          </li>
          <li>
            <span onClick={() => scrollTo('#leon-county-health-department')}>
              Leon County Health Department
            </span>
          </li>
          <li>
            <span onClick={() => scrollTo('#big-bend-cares')}>
              Big Bend Cares
            </span>
          </li>
        </ul>
      </div>
      {/* Family Services (including Education Services) */}
      <div className="question-div">
        <h4>Family Services (including Education Services)</h4>
        <ul>
          <li>
            <span
              onClick={() => scrollTo('#pregnancy-help-and-information-center')}
            >
              Pregnancy Help and Information Center
            </span>
          </li>
          <li>
            <span onClick={() => scrollTo('#whole-child-leon')}>
              Whole Child Leon
            </span>
          </li>
          <li>
            <span onClick={() => scrollTo('#capital-city-youth-services')}>
              Capital City Youth Services
            </span>
          </li>
          <li>
            <span onClick={() => scrollTo('#early-learning-coalition')}>
              Early Learning Coalition
            </span>
          </li>
          <li>
            <span onClick={() => scrollTo('#kids-incorporated')}>
              Kids, Incorporated
            </span>
          </li>
          <li>
            <span onClick={() => scrollTo('#oasis-center-for-women-and-girls')}>
              Oasis Center for Women and Girls
            </span>
          </li>
          <li>
            <span onClick={() => scrollTo('#women-infants-and-children')}>
              Women Infants and Children (WIC)
            </span>
          </li>
          <li>
            <span
              onClick={() => scrollTo('#brehon-institute-for-family-services')}
            >
              Brehon Institute for Family Services
            </span>
          </li>
          <li>
            <span onClick={() => scrollTo('#leon-county-school-board')}>
              Leon County School Board
            </span>
          </li>
          <li>
            <span
              onClick={() =>
                scrollTo('#leon-county-adult-and-community-education')
              }
            >
              Leon County Adult and Community Education (ACE)
            </span>
          </li>
        </ul>
      </div>
      {/* Social Security Cards + Disability Benefits */}
      <div className="question-div">
        <h4>Social Security Cards + Disability Benefits</h4>
        <ul>
          <li>
            <span onClick={() => scrollTo('#social-security-administration')}>
              Social Security Administration
            </span>
          </li>
          <li>
            <span onClick={() => scrollTo('#ability-first-benefits')}>
              Ability1st
            </span>
          </li>
          <li>
            <span
              onClick={() =>
                scrollTo('#kearney-center-for-comprehensive-emergency-services')
              }
            >
              Kearney Center for Comprehensive Emergency Services
            </span>
          </li>
        </ul>
      </div>
      {/* Transportation + Identification */}
      <div className="question-div">
        <h4>Transportation + Identification</h4>
        <ul>
          <li>
            <span onClick={() => scrollTo('#star-metro')}>StarMetro</span>
          </li>
          <li>
            <span
              onClick={() =>
                scrollTo(
                  '#kearney-center-for-comprehensive-emergency-services-transportation'
                )
              }
            >
              Kearney Center for Comprehensive Emergency Services
            </span>
          </li>
          <li>
            <span onClick={() => scrollTo('#echo-emergency-resources-program')}>
              ECHO Emergency Resources Program
            </span>
          </li>
          <li>
            <span onClick={() => scrollTo('#florida-licensing-on-wheels')}>
              Florida Licensing on Wheels (Flow Mobile)
            </span>
          </li>
        </ul>
      </div>
      {/* Substance Abuse Services */}
      <div className="question-div">
        <h4>Substance Abuse Services</h4>
        <ul>
          <li>
            <span onClick={() => scrollTo('#apalachee-center-inc-substance')}>
              Apalachee Center, Inc
            </span>
          </li>
          <li>
            <span onClick={() => scrollTo('#disc-village')}>DISC Village</span>
          </li>
          <li>
            <span onClick={() => scrollTo('#disc-village-adult-residential')}>
              DISC Village Adult Residential
            </span>
          </li>
          <li>
            <span
              onClick={() => scrollTo('#townsend-arc-addition-recovery-center')}
            >
              Townsend ARC (Addiction Recovery Center)
            </span>
          </li>
          <li>
            <span onClick={() => scrollTo('#a-life-recovery')}>
              A Life Recovery
            </span>
          </li>
          <li>
            <span onClick={() => scrollTo('#woodlands-camp')}>
              Woodlands C.A.M.P.
            </span>
          </li>
          <li>
            <span
              onClick={() =>
                scrollTo('#teen-challenge-tallahassee-mens-center')
              }
            >
              Teen Challenge, Tallahassee Men’s Center
            </span>
          </li>
          <li>
            <span onClick={() => scrollTo('#alcoholics-anonymous')}>
              Alcoholics Anonymous
            </span>
          </li>
          <li>
            <span onClick={() => scrollTo('#promise-land-ministries')}>
              Promise Land Ministries ‐ Crawfordville (Wakulla Co.)
            </span>
          </li>
          <li>
            <span onClick={() => scrollTo('#christ-town-ministries')}>
              Christ Town Ministries ‐ Quincy (Gadsden Co.)
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ResourceSideMenu;
