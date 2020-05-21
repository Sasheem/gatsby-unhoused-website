import React from 'react';
import { Link } from 'gatsby';

import SEO from '../components/seo';
import Hero from '../components/Home/hero';
import ResourceItem from '../components/Resources/resourceItem';

import '../components/common/Metrics/metrics.scss';

const Resources = () => {
  return (
    <div className="page-container">
      <SEO title="Resources for Homeless" />
      <div className="page-body">
        <Hero
          title="Are you about to experience homelessness?"
          subtitle="Unhoused Humanity is here to help you get back on your feet. Request help below."
          label="Request Help"
          destination="/contactHelp"
          location="Home"
        />
        <div className="metrics-container">
          <p className="light-text">
            Help us meet needs during COVID19 -{' '}
            <Link to="/contactDonate">Donate</Link>
          </p>
        </div>
        <div className="page-content">
          <div />
          <div className="content-container-two">
            <div className="content-card resource-container">
              <h3>Emergency Shelters</h3>
              <ul>
                <li>
                  <ResourceItem
                    title="The Kearney Center"
                    webLink="https://kearneycenter.org/"
                    address="2650 Municipal Way, Tallahassee, FL 32304"
                    addressLink="https://www.google.com/maps/place/2650+Municipal+Way,+Tallahassee,+FL+32304/@30.440412,-84.3333034,17z/data=!3m1!4b1!4m5!3m4!1s0x88ecf4f28f3a91b9:0x3dc2de83d143d8cf!8m2!3d30.440412!4d-84.3311147"
                    phone="(850) 792-9000"
                    phoneLink="tel:850-792-9000"
                  />
                </li>
                <li>
                  <ResourceItem
                    title="HOPE Community"
                    webLink="https://www.shelterlistings.org/details/30915"
                    address="2729 W. Pensacola Street Tallahassee, FL 32304"
                    addressLink="https://www.google.com/maps/place/2729+W+Pensacola+St,+Tallahassee,+FL+32304/@30.4409914,-84.3353577,17z/data=!3m1!4b1!4m5!3m4!1s0x88ecf48d35673ef9:0x2a315334089dde3c!8m2!3d30.4409914!4d-84.333169"
                    phone="(850) 576-5566"
                    phoneLink="tel:850-576-5566"
                  />
                </li>
                <li>
                  <ResourceItem
                    title="Tallahassee Housing Authority"
                    webLink="https://www.shelterlistings.org/details/32456/"
                    address="2940 Grady Road Tallahassee, FL 32312"
                    addressLink="https://www.google.com/maps/place/2940+Grady+Rd,+Tallahassee,+FL+32312/@30.4852588,-84.291533,17z/data=!3m1!4b1!4m5!3m4!1s0x88ecf5e7b40f6de7:0x4e153c4f5c7250a3!8m2!3d30.4852588!4d-84.2893443"
                    phone="(850) 385-6126"
                    phoneLink="tel:850-385-6126"
                  />
                </li>
                <li>
                  <ResourceItem
                    title="Lutheran Social Services of North Florida Tallahassee"
                    webLink="https://lssnf.org/"
                    address="6077, 606 W 4th Ave #11 Tallahassee, FL 32303"
                    addressLink="https://www.google.com/maps/place/Lutheran+Social+Services+of+North+Florida/@30.4539503,-84.2923814,17z/data=!3m1!4b1!4m5!3m4!1s0x88ecf59f42249493:0xbe712404d4abe5ae!8m2!3d30.4539503!4d-84.2901927"
                    phone="(850) 575-4309"
                    phoneLink="tel:850-575-4309"
                  />
                </li>
                <li>
                  <ResourceItem
                    title="Good News Outreach Inc Tallahassee"
                    webLink="https://www.goodnewsoutreach.org/"
                    address="242 Lafayette Circle Tallahassee, FL 32303"
                    addressLink="https://www.google.com/maps/place/242+Lafayette+Cir,+Tallahassee,+FL+32303/@30.4557177,-84.2809777,16.99z/data=!4m5!3m4!1s0x88ecf58493bd2a57:0xea64638f7dc97809!8m2!3d30.4557379!4d-84.2787998"
                    phone="(850) 412-0016"
                    phoneLink="tel:850-412-0016"
                  />
                </li>
                <li>
                  <ResourceItem
                    title="Haven Of Rest Rescue Mission Tallahassee"
                    webLink="https://nflchurch.org/hor.html"
                    addressLink="https://www.google.com/maps/place/510+W+Tennessee+St,+Tallahassee,+FL+32301/@30.4448229,-84.2915135,17z/data=!3m1!4b1!4m5!3m4!1s0x88ecf574edcef3a3:0xa44d703a3e321aae!8m2!3d30.4448229!4d-84.2893248"
                    address="510 West Tennessee St Tallahassee, FL 32301"
                    phone="(850) 224-7313"
                    phoneLink="tel:850-224-7313"
                  />
                </li>
                <li>
                  <ResourceItem
                    title="Florida Housing Finance Corporation Tallahassee"
                    webLink="https://www.floridahousing.org/"
                    address="227 N. Bronough Street, Suite 5000 Tallahassee, FL 32301"
                    addressLink="https://www.google.com/maps/place/227+N+Bronough+St+%235000,+Tallahassee,+FL+32301/@30.4440986,-84.286109,17z/data=!3m1!4b1!4m5!3m4!1s0x88ecf576cfa1eff9:0x26841f543db39829!8m2!3d30.4440986!4d-84.2839203"
                    phone="(850) 488-4197"
                    phoneLink="tel:850-488-4197"
                  />
                </li>
                <li>
                  <ResourceItem
                    title="City Walk Urban Mission"
                    webLink="https://www.citywalkthrift.com/"
                    address="1351 thomasville Road Tallahassee, FL 32305"
                    addressLink="https://www.google.com/maps/place/1351+Thomasville+Rd,+Tallahassee,+FL+32303/@30.4580644,-84.2788086,17z/data=!3m1!4b1!4m5!3m4!1s0x88ecf585b807877b:0xae47b2ae4cc3655f!8m2!3d30.4580644!4d-84.2766199"
                    phone="(850) 528-3909"
                    phoneLink="tel:850-528-3909"
                  />
                </li>
              </ul>
            </div>
            <div className="content-card resource-container">
              <h3>Food</h3>
              <ul>
                <li>
                  <ResourceItem
                    title="Salvation Army, Tallahassee Division"
                    webLink="https://www.homelessshelterdirectory.org/cgi-bin/id/foodbank.cgi?foodbank=11639"
                    address="206 W Virginia Street Tallahassee, FL 32301"
                    addressLink="https://www.google.com/maps/place/206+W+Virginia+St,+Tallahassee,+FL+32301/@30.4460075,-84.2856566,17z/data=!3m1!4b1!4m5!3m4!1s0x88ecf576ff2eced9:0x11a6a2e2304473f9!8m2!3d30.4460075!4d-84.2834679"
                    phone="(850) 222-3255"
                    phoneLink="tel:850-222-3255"
                  />
                </li>
                <li>
                  <ResourceItem
                    title="Capitol Area Community Action Agency"
                    webLink="https://www.homelessshelterdirectory.org/cgi-bin/id/foodbank.cgi?foodbank=9238"
                    address="309 Office Plaza Drive Tallahassee, FL 32301"
                    addressLink="https://www.google.com/maps/place/309+Office+Plaza+Dr,+Tallahassee,+FL+32301/@30.4453136,-84.2616337,17z/data=!3m1!4b1!4m5!3m4!1s0x88ec5f9d2b1d34b7:0x21229571f6eb0a47!8m2!3d30.4453136!4d-84.259445"
                    phone="(850) 222-2043"
                    phoneLink="tel:850-222-2043"
                  />
                </li>
                <li>
                  <ResourceItem
                    title="Good News Outreach Food Pantry"
                    webLink="https://www.goodnewsoutreach.org/"
                    address="548 E Bradford Rd Tallahassee, FL 32303"
                    addressLink="https://www.google.com/maps/place/548+E+Bradford+Rd,+Tallahassee,+FL+32303/@30.4680619,-84.2753771,17z/data=!3m1!4b1!4m5!3m4!1s0x88ecf58c4878a685:0x8d8715f4336be2e!8m2!3d30.4680619!4d-84.2731884"
                    phone="(850) 412-0016"
                    phoneLink="tel:850-412-0016"
                  />
                </li>
                <li>
                  <ResourceItem
                    title="Echo"
                    webLink="https://www.homelessshelterdirectory.org/cgi-bin/id/foodbank.cgi?foodbank=6810"
                    address="702 W Madison Street Tallahassee, FL 32304"
                    addressLink="https://www.google.com/maps/place/702+W+Madison+St,+Tallahassee,+FL+32304/@30.4368361,-84.295444,17z/data=!3m1!4b1!4m5!3m4!1s0x88ecf5128c259413:0x9e678e5dce583d9e!8m2!3d30.4368361!4d-84.2932553"
                    phone="(850) 224-3246"
                    phoneLink="tel:850-224-3246"
                  />
                </li>
                <li>
                  <ResourceItem
                    title="Immanuel Baptist Church"
                    webLink="https://www.homelessshelterdirectory.org/cgi-bin/id/foodbank.cgi?foodbank=8793"
                    address="2351 Mahan Drive Tallahassee, FL 32308"
                    addressLink="https://www.google.com/maps/place/2351+Mahan+Dr,+Tallahassee,+FL+32308/@30.454013,-84.2434537,17z/data=!3m1!4b1!4m5!3m4!1s0x88ec5f0edecfae53:0xc59ab59b3e72c216!8m2!3d30.454013!4d-84.241265"
                    phone="(850) 878-1021"
                    phoneLink="tel:850-878-1021"
                  />
                </li>
                <li>
                  <ResourceItem
                    title="Salvation Army, Tallahassee Division Food Pantry"
                    webLink="http://www.salvationarmyflorida.org/tallahassee"
                    address="2410 Allen Road Tallahassee, FL 32312"
                    addressLink="https://www.google.com/maps/place/2410+Allen+Rd,+Tallahassee,+FL+32312/@30.4765126,-84.2971299,17z/data=!3m1!4b1!4m5!3m4!1s0x88ecf5c115d1c849:0xc8a751104f43f976!8m2!3d30.4765126!4d-84.2949412"
                    phone="(850) 222-0304"
                    phoneLink="tel:850-222-0304"
                  />
                </li>
              </ul>
            </div>
          </div>
          <div />
        </div>
      </div>
    </div>
  );
};

export default Resources;
