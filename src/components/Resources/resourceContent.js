import React from 'react';

import ResourceItem from '../Resources/resourceItem';

import '../common/Metrics/metrics.scss';

const ResourceContent = () => {
  return (
    <div className="faq-content">
      {/* Emergency Shelters */}
      <div className="faq-content-row">
        <h2>Emergency Shelters</h2>
        <div className="resource-panel">
          <ResourceItem
            resource="kearney-center"
            title="Kearney Center for Comprehensive Emergency Services"
            description=" Emergency shelter and meals for single men and women. Case Management services offered."
            webLink="https://kearneycenter.org/home/"
            addressLink="https://www.google.com/maps/place/2650+Municipal+Way,+Tallahassee,+FL+32304/@30.440412,-84.3316619,19z/data=!3m1!4b1!4m13!1m7!3m6!1s0x88ecf4f28f3a91b9:0x3dc2de83d143d8cf!2s2650+Municipal+Way,+Tallahassee,+FL+32304!3b1!8m2!3d30.440412!4d-84.3311147!3m4!1s0x88ecf4f28f3a91b9:0x3dc2de83d143d8cf!8m2!3d30.440412!4d-84.3311147"
            address="2650 Municipal Way Tallahassee, FL 32304"
            phoneLink="tel:850-792-9000"
            phone="(850) 792-9000"
          />
          <ResourceItem
            resource="ccys-emergency-shelter"
            title="Capital City Youth Services Emergency and Transitional Shelter"
            description="24hr short term residential program for runaway & homeless youth ages 10-17; transitional housing for youth in crisis ages 18-21. Drop-in Center provides case management for at-risk teens ages 11-21."
            webLink="https://www.ccys.org/"
            address="2407 Roberts Ave Tallahassee, FL 32310"
            addressLink="https://www.google.com/maps/place/2407+Roberts+Ave,+Tallahassee,+FL+32310/@30.4290592,-84.3280105,16.71z/data=!4m5!3m4!1s0x88ecf4e9c30abcc5:0xc98efb5869cdb249!8m2!3d30.4292199!4d-84.3257048"
            phone="(850) 576‐6000"
            phoneLink="tel:850-576‐6000"
          />
          <ResourceItem
            resource="hope-community"
            title="Hope Community (Big Bend Homeless Coalition)"
            description="Emergency shelter for families. "
            webLink="http://www.bigbendhc.org/"
            addressLink="https://www.google.com/maps/place/2729+W+Pensacola+St,+Tallahassee,+FL+32304/@30.4409914,-84.3353577,17z/data=!3m1!4b1!4m5!3m4!1s0x88ecf48d35673ef9:0x2a315334089dde3c!8m2!3d30.4409914!4d-84.333169"
            address="2729 W Pensacola St Tallahassee, FL 32304"
            phoneLink="tel:850-576‐5566"
            phone="(850) 576‐5566"
            phoneLinkTwo="tel:850‐597‐4259 "
            phoneTwo=" (850) 597‐4259 "
          />
          <ResourceItem
            resource="refuge-house"
            title="Refuge House"
            description="Emergency shelter, transitional housing, rape crisis and overall support for survivors of domestic and sexual violence survivors. 24-Hour Hotlines"
            webLink="https://refugehouse.com/"
            phoneLink="tel:1‐800‐500‐1119"
            phone="1‐800‐500‐1119"
            phoneLinkTwo="tel:850-681‐2111 "
            phoneTwo="(850) 681‐2111"
          />
        </div>
      </div>
      {/* Housing Services */}
      <div className="faq-content-row">
        <h2>Housing Services</h2>
        <div className="resource-panel">
          <ResourceItem
            resource="brehon-house"
            title="Brehon House"
            description=" Housing and support for homeless, pregnant women ages eighteen or older w/ one child (three years or younger). Healthy Families Program for infants less than 3 months old. "
            webLink="http://www.brehonfamilyservices.org/"
            addressLink="https://www.google.com/maps/place/1315+Linda+Ann+Dr,+Tallahassee,+FL+32301/@30.4291498,-84.2469848,17z/data=!3m1!4b1!4m5!3m4!1s0x88ec5fbebc4ffc57:0x12b857525cc8ce7c!8m2!3d30.4291498!4d-84.2447961"
            address="1315 Linda Ann Dr Tallahassee, FL 32301"
            phoneLink="tel:850-656‐7110"
            phone="(850) 656‐7110"
          />
          <ResourceItem
            resource="westgate-community"
            title="Westgate Community"
            description=" For individual men and women . Assessment required prior to housing; housing options based on income."
            webLink="https://westgatetlh.org/"
            addressLink="https://www.google.com/maps/place/3215+Westgate+Ct,+Tallahassee,+FL+32304/@30.4626899,-84.3495333,17z/data=!3m1!4b1!4m5!3m4!1s0x88ecf47a72318bb5:0x4aaa0be0cb177173!8m2!3d30.4626899!4d-84.3473446"
            address="3215 Westgate Court Tallahassee, FL 32304"
            phoneLink="tel:850-574‐0624"
            phone="(850) 574‐0624"
          />
          <ResourceItem
            resource="chelsea-house"
            title="Chelsea House"
            description="Faith-based transitional facility for single women and families."
            webLink="https://www.rightservicefl.org/node/19694"
            addressLink=""
            address=""
            phoneLink="tel:850-217‐1113"
            phone="(850) 217‐1113"
          />
          <ResourceItem
            resource="ccys-transitional-shelter"
            title="Capital City Youth Services Transitional Shelter"
            description="Transitional housing for youth in crisis."
            webLink="https://www.ccys.org/"
            addressLink="https://www.google.com/maps/place/2407+Roberts+Ave,+Tallahassee,+FL+32310/@30.4292199,-84.3278935,17z/data=!3m1!4b1!4m5!3m4!1s0x88ecf4e9c30abcc5:0xc98efb5869cdb249!8m2!3d30.4292199!4d-84.3257048"
            address="2407 Roberts Ave Tallahassee, FL 32310"
            phoneLink="tel:850-576‐6000"
            phone="(850) 576‐6000"
          />
          <ResourceItem
            resource="living-harvest-serenity-house"
            title="The Living Harvest, Serenity House"
            description="Alcohol/drug free faith-based rehabilitation center for men."
            webLink="http://www.thelivingharvest.org/residential.html"
            addressLink="https://www.google.com/maps/place/1219+W+Tharpe+St,+Tallahassee,+FL+32303/@30.4631592,-84.3045719,17z/data=!3m1!4b1!4m5!3m4!1s0x88ecf5b06e706709:0x5d077ad6dc883b88!8m2!3d30.4631592!4d-84.3023832"
            address="308 Orange Ave Tallahassee, FL 32301"
            phoneLink="tel:850-900‐5930"
            phone="(850) 900‐5930"
          />
          <ResourceItem
            resource="city-walk-urban-mission-transition-home"
            title="City Walk Urban Mission Transition Home"
            description="Transitional housing for ex-offenders, including individuals required to register for sex offenses."
            webLink="https://www.citywalkthrift.com/"
            addressLink="https://www.google.com/maps/place/1105+N+Monroe+St,+Tallahassee,+FL+32303/@30.4536678,-84.2823664,17z/data=!3m1!4b1!4m5!3m4!1s0x88ecf5834e61d7b3:0x94274e7acb5ac465!8m2!3d30.4536678!4d-84.2801777"
            address="1105 North Monroe Street Tallahassee, FL 32303"
            phoneLink="tel:850-528‐3909"
            phone="(850) 528‐3909"
          />
          <ResourceItem
            resource="making-miracles-group-home"
            title="Making Miracles Group Home"
            description="Faith-based transitional group home for pregnant young women and teens."
            webLink="https://www.makingmiraclesgrouphome.org/"
            addressLink=""
            address=""
            phoneLink="tel:850-727‐3304"
            phone="(850) 727‐3304"
          />
          <ResourceItem
            resource="home-plate-balkin"
            title="Home Plate - Home Place at Balkin - A Place Called Home"
            description=" Program for chronically homeless individuals who have a disability. Referral must be completed by a case manager. Individuals and families"
            webLink="http://bigbendhc.org/programs.htm"
            addressLink=""
            address=""
            phoneLink=""
            phone=""
          />
          <ResourceItem
            resource="maryland-oaks"
            title="Maryland Oaks"
            description=" Housing for single women with children. SecƟon 8 vouchers accepted."
            webLink="https://www.goodnewsoutreach.org/maryland-oaks-crossing"
            addressLink="https://www.google.com/maps/place/3103+Bicycle+Rd,+Tallahassee,+FL+32304/@30.4581202,-84.3478386,17z/data=!3m1!4b1!4m5!3m4!1s0x88ecf47b654d9aad:0x977d0f0caba0c969!8m2!3d30.4581202!4d-84.3456499"
            address="3103 Bicycle Rd Tallahassee, FL 32304"
            phoneLink="tel:850-412‐0016"
            phone="(850) 412‐0016"
          />
          <ResourceItem
            resource="tallahassee-housing-authority"
            title="Tallahassee Housing Authority"
            description=" Federally funded housing program with monthly rent based on total income."
            webLink="https://www.tallha.org/"
            addressLink="https://www.google.com/maps/place/2940+Grady+Rd,+Tallahassee,+FL+32312/@30.4852588,-84.291533,17z/data=!3m1!4b1!4m5!3m4!1s0x88ecf5e7b40f6de7:0x4e153c4f5c7250a3!8m2!3d30.4852588!4d-84.2893443"
            address="2940 Grady Rd Tallahassee, FL 32312"
            phoneLink="tel:850-385‐6126"
            phone="(850) 385‐6126"
          />
        </div>
      </div>
      {/* Housing Services for Qualified Veteran */}
      <div className="faq-content-row">
        <h2>Housing Services for Qualified Veterans</h2>
        <div className="resource-panel">
          <ResourceItem
            resource="ssvf-program"
            title="Supportive Services for Veteran Families"
            description="Case management, homelessness prevention and rapid rehousing program for qualified, very low income Veterans."
            webLink="http://bigbendhc.org/programs.htm"
            addressLink=""
            address=""
            phoneLink="tel:850-597‐5595"
            phone="(850) 597‐5595"
            subtitleOne="Outreach/Eligibility"
          />
          <ResourceItem
            resource="home-front"
            title="Home Front"
            description=" Apartment complex housing for homeless Veterans. Must apply through the VA’s Healthcare for Homeless Veterans Outreach Worker, Denna Green-Corbett."
            webLink="http://bigbendhc.org/programs.htm"
            addressLink="https://www.google.com/maps/place/1602+Stuckey+Ave,+Tallahassee,+FL+32310/@30.4267078,-84.3100809,17z/data=!3m1!4b1!4m5!3m4!1s0x88ecf521e6b7771f:0x64c9958c29b37cc!8m2!3d30.4267078!4d-84.3078922"
            address="1602 Stuckey Ave Tallahassee, FL 32310"
            phoneLink="tel:850-574‐8000"
            phone="(850) 574‐8000"
          />
          <ResourceItem
            resource="veterans-village"
            title="Veterans Village"
            description="A 6-month transitional housing program for veterans (no longer 24 months). Must qualify for VA medical services."
            webLink="http://voaflorida.org/tallahassee/"
            addressLink="https://www.google.com/maps/place/1280+Kissimmee+St,+Tallahassee,+FL+32310/@30.4225905,-84.3040764,17z/data=!3m1!4b1!4m5!3m4!1s0x88ecf52333f1313b:0x8486352a66a76b95!8m2!3d30.4225905!4d-84.3018877"
            address="1280 Kissimmee St. Tallahassee, FL 32310"
            phoneLink="tel:850-575‐3140"
            phone="(850) 575‐3140"
          />
        </div>
      </div>
      {/* Other Veterans Services */}
      <div className="faq-content-row">
        <h2>Other Veteran Services</h2>
        <div className="resource-panel">
          <ResourceItem
            resource="leon-county-veteran-services"
            title="Leon County Veteran Services"
            description="The Leon County Division of Veteran Services assists Veterans and their dependents in securing all entitled benefits earned through honorable military service and to advocate for Veteran's interests in the community (Includes assistance with filing claims, obtaining emergency financial assistance, and transportation for homeless Veterans via StarMetro Veterans BusPass program). Mon-Thurs appointments only. Fridays are walk ins only."
            webLink="http://cms.leoncountyfl.gov/Home/Departments/Office-of-Human-Services-and-Community-Partnership/Veterans-Services"
            addressLink="https://www.google.com/maps/place/918+Railroad+Ave,+Tallahassee,+FL+32310/@30.4336565,-84.2924833,17z/data=!3m1!4b1!4m5!3m4!1s0x88ecf56cc5f520c7:0x7727afda7705d7dd!8m2!3d30.4336565!4d-84.2902946"
            address="918 Railroad Ave Tallahassee, FL 32310"
            phoneLink="tel:850-606‐1940"
            phone="(850) 606‐1940"
          />
          <ResourceItem
            resource="vet-center"
            title="Vet Center (Department of Veterans Affairs)"
            description="Welcoming home war veterans with honor by providing quality readjustment counseling in a caring manner. Vet Centers understand and appreciate Veterans' war experiences while assisting them and their family members toward a successful post-war adjustment in or near their community. Counseling services provided."
            webLink="https://www.vetcenter.va.gov/"
            addressLink="https://www.google.com/maps/place/2002+Old+St+Augustine+Rd+Bldg.+A-100,+Tallahassee,+FL+32301/@30.4266563,-84.2484252,17z/data=!3m1!4b1!4m5!3m4!1s0x88ec5fbf07f16bfb:0x22afadcf1ac460e6!8m2!3d30.4266563!4d-84.2462365"
            address="2002 Old St Augustine Rd Bldg. A-100 Tallahassee, FL 32301"
            phoneLink="tel:850-942‐8810"
            phone="(850) 942‐8810"
            subtitleTwo="For assistance after hours, weekends, and holidays"
            phoneLinkTwo="tel:1‐877‐927‐8387"
            phoneTwo="1‐877‐WAR‐VETS (1‐877‐927‐8387)"
          />
        </div>
      </div>
      {/* Foot + Clothing */}
      <div className="faq-content-row">
        <h2>Foot + Clothing</h2>
        <div className="resource-panel">
          <ResourceItem
            resource="grace-mission"
            title="Grace Mission"
            description=" Dinner after services on Tuesday and Thursday evenings, Saturday and Sunday mornings. Closed on Mondays. Shower available Tuesday and Thursday at 3:00pm, and clothes distributed the first Wednesday of month at 3:00p."
            webLink="http://www.gracemission.net/"
            addressLink="https://www.google.com/maps/place/305+W+Brevard+St,+Tallahassee,+FL+32301/@30.4487615,-84.2869518,17z/data=!3m1!4b1!4m5!3m4!1s0x88ecf59df58661af:0xb9a0c6e39fac0a45!8m2!3d30.4487615!4d-84.2847631"
            address="305 W Brevard St Tallahassee, FL 32301"
            phoneLink="tel:850-224‐3817"
            phone="(850) 224‐3817"
          />
          <ResourceItem
            resource="dcf-access-florida-program"
            title="DCF ACCESS Florida Program"
            description="SNAP/Food Stamps, etc. Also includes TANF and Medicaid eligibility."
            webLink="https://www.myflorida.com/accessflorida/"
            addressLink=""
            address=""
            phoneLink="tel:1‐866‐762‐2237"
            phone="1‐866‐762‐2237"
          />
          <ResourceItem
            resource="salvation-army"
            title="Salvation Army ‐ food pantry and clothing vouchers"
            description="Open Monday-Friday 10:00am-1:00pm. Must have picture ID and social security card."
            webLink=""
            addressLink="https://www.google.com/maps/place/2410+Allen+Rd,+Tallahassee,+FL+32312/@30.4765126,-84.2971299,17z/data=!3m1!4b1!4m5!3m4!1s0x88ecf5c115d1c849:0xc8a751104f43f976!8m2!3d30.4765126!4d-84.2949412"
            address="2410 Allen Rd Tallahassee, FL 32312"
            phoneLink="tel:850-222‐0304"
            phone="(850) 222‐0304"
            subtitleTwo="Thrift Store"
            phoneLinkTwo="tel:850-575‐9798"
            phoneTwo="(850) 575‐9798"
          />
          <ResourceItem
            resource="echo-outreach"
            title="ECHO Outreach Ministries Emergency Resources Program"
            description="Food pantry, clothing vouchers, household items. Monday –Friday 9:00am-12:00pm."
            webLink="https://echotlh.org/"
            addressLink="https://www.google.com/maps/place/1701+S+Gadsden+St,+Tallahassee,+FL+32301/@30.4260667,-84.2801005,17z/data=!3m1!4b1!4m5!3m4!1s0x88ecf55d0b81e723:0xdf57c848da66ecf5!8m2!3d30.4260667!4d-84.2779118"
            address="1701 S Gadsden St Tallahassee, FL 32301"
            phoneLink="tel:850-224‐3246"
            phone="(850) 224‐3246"
            subtitleTwo="For furniture requests contact Steven - Tallahassee Furniture Bank"
            phoneLinkTwo="tel:850-224‐3246"
            phoneTwo="(850) 224‐3246"
          />
          <ResourceItem
            resource="the-living-harvest"
            title="The Living Harvest"
            description="Thrift Store is open to general public Monday-Saturday 9:00am-5:00pm."
            webLink="http://www.thelivingharvest.org/"
            addressLink="https://www.google.com/maps/place/4500+W+Shannon+Lakes,+Tallahassee,+FL+32309/@30.5359299,-84.219035,17z/data=!3m1!4b1!4m5!3m4!1s0x88ec59086fb1e0bd:0xac4477523321cf14!8m2!3d30.5359299!4d-84.2168463"
            address="4500 West Shannon Lakes Drive, Tallahassee, FL"
            phoneLink="tel:850-765‐6285"
            phone="(850) 765‐6285"
          />
          <ResourceItem
            resource="catholic-charities"
            title="Catholic Charities"
            description="Food: Monday -Thursday from 2:30pm-3:30pm. Must have picture ID. Clothing: Monday-Thursday 8:30am-12:00pm and 1:00pm-4:00pm."
            webLink="https://ccnwfl.org/"
            addressLink=""
            address="1380 Blountstown Hwy Tallahassee, FL 32304"
            phoneLink="tel:850-222‐2180"
            phone="(850) 222‐2180"
          />
          <ResourceItem
            resource="city-walk-urban-mission-thrift-store"
            title="City Walk Urban Mission Thrift Store"
            description="Distribution of clothes and food every Tuesday at 6:00pm."
            webLink="https://www.citywalkthrift.com/"
            addressLink="https://www.google.com/maps/place/1105+N+Monroe+St,+Tallahassee,+FL+32303/@30.4536678,-84.2823664,17z/data=!3m1!4b1!4m5!3m4!1s0x88ecf5834e61d7b3:0x94274e7acb5ac465!8m2!3d30.4536678!4d-84.2801777"
            address="1105 N Monroe St Tallahassee, FL 32303"
            phoneLink="tel:850-528‐3909"
            phone="(850) 528‐3909"
          />
          <ResourceItem
            resource="good-news-outreach"
            title="Good News Outreach"
            description=" Monday-Thursday 9:00am-4:00pm, Friday 9:00am-1:00pm. Food may be picked up once a month. Mobile delivery is offered to seniors age 60 and over, and disabled clients."
            webLink="https://www.goodnewsoutreach.org/"
            addressLink="https://www.google.com/maps/place/347+Office+Plaza+Dr,+Tallahassee,+FL+32301/@30.4460999,-84.2616856,17z/data=!3m1!4b1!4m5!3m4!1s0x88ec5f82ccb47e5b:0xa01dd29e8a3d44c7!8m2!3d30.4460999!4d-84.2594969"
            address="548 East Bradford Road Tallahassee, FL 32303"
            phoneLink="tel:850-412‐0016"
            phone="(850) 412‐0016"
          />
          <ResourceItem
            resource="maranatha-sda-church"
            title="Maranatha SDA Church"
            description="Food and clothing on the 2nd and 4th Wednesday every month from 6:00pm7:00pm."
            webLink="http://maranathasda.org/"
            addressLink="https://www.google.com/maps/place/3121+Jim+Lee+Rd,+Tallahassee,+FL+32301/@30.4057414,-84.2655833,17z/data=!3m1!4b1!4m5!3m4!1s0x88ec5ffc480d1a6d:0x7301523db1490bea!8m2!3d30.4057414!4d-84.2633946"
            address="3121 Jim Lee Rd Tallahassee, FL 32301"
            phoneLink="tel:850-878‐7780"
            phone="(850) 878‐7780"
          />
          <ResourceItem
            resource="jacob-chapel-baptist-church"
            title="Jacob Chapel Baptist Church"
            description="Food pantry available Monday, Tuesday and Wednesday from 2:30pm6:30pm. Bread is distributed every Thursday at 9:00am. Farm Share is held the first Friday of each month beginning at 12:00pm."
            webLink="http://jacobchapel.org/"
            addressLink="https://www.google.com/maps/place/2333+Lake+Bradford+Rd,+Tallahassee,+FL+32310/@30.4140315,-84.3074498,17z/data=!3m1!4b1!4m5!3m4!1s0x88ecf52f14db0963:0xd6b2ca5533914204!8m2!3d30.4140315!4d-84.3052611"
            address="2333 Lake Bradford Rd Tallahassee, FL 32310"
            phoneLink="tel:850-574‐3150"
            phone="(850) 574‐3150"
          />
          <ResourceItem
            resource="redeemers-storehouse"
            title="Redeemer’s Storehouse‐Lake Jackson United Methodist Church"
            description=" Food Pantry, quarterly hygiene/personal items. 8:30a-10:30a 3rd Sat. of the month."
            webLink="http://lake-jackson-umc.org/index.php/Redeemer%27s-Storehouse"
            addressLink="https://www.google.com/maps/place/4423+N+Monroe+St,+Tallahassee,+FL+32303/@30.5161526,-84.3477256,17z/data=!3m1!4b1!4m5!3m4!1s0x88ecf6b73d0fa53d:0x1b4ddbf7b44a1e3a!8m2!3d30.5161526!4d-84.3455369"
            address="4423 N Monroe St Tallahassee, FL 32303"
            phoneLink="tel:850-562‐1759"
            phone="(850) 562‐1759"
          />
          <ResourceItem
            resource="calvary-united-methodist-church"
            title="Calvary United Methodist Church"
            description="Free clothing every Monday and the second Saturday of every month 8:30am-12:00pm."
            webLink="https://www.umc.org/en/find-a-church/church/?id=36454"
            addressLink="https://www.google.com/maps/place/218+Ausley+Rd,+Tallahassee,+FL+32304/@30.4397013,-84.323168,17z/data=!3m1!4b1!4m5!3m4!1s0x88ecf4faced618bd:0x320fdda1b21763a4!8m2!3d30.4397013!4d-84.3209793"
            address="218 Ausley Rd Tallahassee, FL 32304"
            phoneLink="tel:850-576‐3124"
            phone="(850) 576‐3124"
          />
        </div>
      </div>
      {/* Drop-In Centers/Outreach */}
      <div className="faq-content-row">
        <h2>Drop-In Centers/Outreach</h2>
        <div className="resource-panel">
          <ResourceItem
            resource="going-places-street-outreach"
            title="Going Places Street Outreach, Drop‐In Center"
            description="Must be under 21 years old. Assistance with employment, food, and independent living skills. Shower and laundry facility available."
            webLink="https://www.ccys.org/programs-at-a-glance/going-places-street-outreach/"
            addressLink="https://www.google.com/maps/place/654+Dunn+St,+Tallahassee,+FL+32304/@30.4500109,-84.2956701,17z/data=!3m1!4b1!4m5!3m4!1s0x88ecf5a07cf20e23:0x41c2290a5164109c!8m2!3d30.4500109!4d-84.2934814"
            address="654 Dunn St Tallahassee, FL 32304"
            phoneLink="tel:850-274‐8689"
            phone="(850) 274‐8689"
            subtitleTwo="24 Hour Crisis Line"
            phoneLinkTwo="tel:850-576‐6000"
            phoneTwo="(850) 576‐6000"
          />
          <ResourceItem
            resource="good-samaritan-chapel-and-resource-center"
            title="Good Samaritan Chapel and Resource Center"
            description="Daily chapel, music, a message of hope, dinner, clothing, groceries, and counseling. Food pantry and benevolence assistance available. Email info@goodsamaritanchapel.org or visit website (gsncares.org) for times & locations."
            webLink="https://www.gsncares.org/"
            addressLink=""
            address=""
            phoneLinkTwo="tel:850-297‐1113"
            phoneTwo="(850) 297‐1113"
            subtitleTwo="Email or visit website for times and locations"
            email="info@goodsamaritanchapel.org"
          />
        </div>
      </div>
      {/* Job Training + Placement */}
      <div className="faq-content-row">
        <h2>Job Training + Placement</h2>
        <div className="resource-panel">
          <ResourceItem
            resource="careersource-capital-region"
            title="CareerSource Capital Region"
            description="Comprehensive career resource center. MondayThursday 8:30am-6:00pm, Friday 8:30am-1:00pm."
            webLink="https://www.careersourcecapitalregion.com/"
            addressLink="https://www.google.com/maps/place/2601+N+Blair+Stone+Rd+Building+C,+Ste.+200,+Tallahassee,+FL+32301/@30.4261405,-84.2509766,17z/data=!3m1!4b1!4m5!3m4!1s0x88ec5fbfde4e8707:0x835c74536dfa6e3e!8m2!3d30.4261405!4d-84.2487879"
            address="2601 N Blair Stone Rd Building C, Ste. 200"
            phoneLink="tel:850-922‐0023"
            phone="(850) 922‐0023"
          />
          <ResourceItem
            resource="goodwill-prosperity-center"
            title="Goodwill Prosperity Center"
            description="Assist low-income adults with career services and financial education."
            webLink="http://www.goodwillbigbend.org/"
            addressLink="https://www.google.com/maps/place/300+Mabry+St,+Tallahassee,+FL+32304/@30.4390276,-84.3303446,17z/data=!3m1!4b1!4m5!3m4!1s0x88ecf4edfc412151:0x81c2f79869c0070f!8m2!3d30.4390276!4d-84.3281559"
            address="300 Mabry St Tallahassee, FL 32304"
            phoneLink="tel:850-576‐5235"
            phone="(850) 576‐5235 "
          />
          <ResourceItem
            resource="vocational-rehabilitation"
            title="Vocational Rehabilitation"
            description="Services to those with physical or mental disabilities, for evaluation, training, and job placement Monday-Friday 8:00am-5:00pm."
            webLink="http://www.rehabworks.org/"
            addressLink="https://www.google.com/maps/place/1311+Executive+Center+Dr+Bldg.,+Suite+100A,+Tallahassee,+FL+32301/@30.4264645,-84.2369425,17z/data=!3m1!4b1!4m5!3m4!1s0x88ec5fb65eaf2f03:0xeaf069d628899a66!8m2!3d30.4264645!4d-84.2347538"
            address="1311 Executive Center Dr Bldg., Suite 100A"
            phoneLink="tel:850-245‐3430"
            phone="(850) 245‐3430"
          />
        </div>
      </div>
      {/* Legal Services */}
      <div className="faq-content-row">
        <h2>Legal Services</h2>
        <div className="resource-panel">
          <ResourceItem
            resource="legal-services-north-florida"
            title="Legal Services of North Florida"
            description=" Free legal representation to low income individuals with civil legal problems. Includes issues related to landlord/tenant law, disability claims, back-tax assistance, and more. Call for appointment."
            webLink="https://www.lsnf.org/"
            addressLink="https://www.google.com/maps/place/2119+Delta+Blvd,+Tallahassee,+FL+32303/@30.4755872,-84.2826337,17z/data=!3m1!4b1!4m5!3m4!1s0x88ecf5f277b10649:0x6c3228ab3ab980b4!8m2!3d30.4755872!4d-84.280445"
            address="2119 Delta Blvd Tallahassee, FL 32303"
            phoneLink="tel:850-385‐9007"
            phone="(850) 385‐9007"
          />
        </div>
      </div>
      {/* Financial Assistance */}
      <div className="faq-content-row">
        <h2>Financial Assistance</h2>
        <div className="resource-panel">
          <ResourceItem
            resource="capital-area-community-action"
            title="Capital Area Community Action"
            description="Assistance to homeless families and individuals, rental assistance and Family Self Sufficiency Program. By Appointment only. Call M-Thurs. 3:45pm-4:45pm to schedule appointment."
            webLink="http://capitalareacommunityactionagency.com/"
            addressLink="https://www.google.com/maps/place/309+Office+Plaza+Dr,+Tallahassee,+FL+32301/@30.4453136,-84.2616337,17z/data=!3m1!4b1!4m5!3m4!1s0x88ec5f9d2b1d34b7:0x21229571f6eb0a47!8m2!3d30.4453136!4d-84.259445"
            address="309 Office Plaza Dr Tallahassee, FL 32301"
            phoneLink="tel:850-222‐2043"
            phone="(850) 222‐2043"
          />
          <ResourceItem
            resource="catholic-charities"
            title="Catholic Charities"
            description="Emergency assistance for financial, past due rent and utility needs. Call 9am - 10am Monday (Leon County) or Tuesday (all other counƟes)."
            webLink="https://ccnwfl.org/"
            addressLink="https://www.google.com/maps/place/1380+Blountstown+Hwy,+Tallahassee,+FL+32304/@30.4552594,-84.3478078,17z/data=!3m1!4b1!4m5!3m4!1s0x88ecf47ce549c543:0x6ef44d4800d189bb!8m2!3d30.4552594!4d-84.3456191"
            address="1380 Blountstown Hwy Tallahassee, FL 32304"
            phoneLink="tel:850-222‐2180"
            phone="(850) 222‐2180"
          />
          <ResourceItem
            resource="homeless-prevention"
            title="Homeless Prevention (Big Bend Homeless Coalition)"
            description="Financial assistance program focuses on preventing low income individuals and families from being evicted. Must meet eligibility and very limited funding."
            webLink="http://bigbendhc.org/programs.htm"
            addressLink=""
            address=""
            phoneLink="tel:850-792‐9415"
            phone="(850) 792‐9415"
          />
        </div>
      </div>
      {/* Mental Health + Medical Services */}
      <div className="faq-content-row">
        <h2>Mental Health + Medical Services</h2>
        <div className="resource-panel">
          <ResourceItem
            resource="apalachee-center-inc"
            title="Apalachee Center, Inc"
            description="24 hour crisis stabilization, mental health evaluations, medication management, and case management services available."
            webLink="https://apalacheecenter.org/"
            addressLink="https://www.google.com/maps/place/2634+Capital+Cir+NE,+Tallahassee,+FL+32308/@30.4869598,-84.2422429,17z/data=!3m1!4b1!4m5!3m4!1s0x88ec5f31885a724d:0xca0c4f843e372fcb!8m2!3d30.4869598!4d-84.2400542"
            address="2634 Capital Cir NE Tallahassee, FL 32308"
            phoneLink="tel:850-523‐3333"
            phone="(850) 523‐3333"
          />
          <ResourceItem
            resource="the-homeless-project"
            title="The Homeless Project (Apalachee Center)"
            description="Case management services for individuals who are homeless and living with a mental illness. Mon-Fri 8am-5pm."
            webLink="https://apalacheecenter.org/homeless-project/"
            addressLink="https://www.google.com/maps/place/2634+Capital+Cir+NE+Bldg.+C,+Tallahassee,+FL+32308/@30.4869598,-84.2422429,17z/data=!3m1!4b1!4m5!3m4!1s0x88ec5f31885a724d:0x1f0639e0f3e3b22a!8m2!3d30.4869598!4d-84.2400542"
            address="2634 Capital Cir NE Bldg. C Tallahassee, FL 32308"
            phoneLink="tel:850-523‐3301"
            phone="(850) 523‐3301"
          />
          <ResourceItem
            resource="ability-first"
            title="Ability1st"
            description=" Services are for any person living with a disability. (Local Center for Independent Living). Supportive services and assistance with obtaining benefits, peer counseling, housing, and more. Mon-Fri 8am-5pm."
            webLink="https://www.ability1st.info/"
            addressLink="https://www.google.com/maps/place/1823+Buford+Ct,+Tallahassee,+FL+32308/@30.4738085,-84.2329206,17z/data=!3m1!4b1!4m5!3m4!1s0x88ec5f211f1b72eb:0x7e1b690e8173b0e1!8m2!3d30.4738085!4d-84.2307319"
            address="1823 Buford Ct Tallahassee, FL 32308"
            phoneLink="tel:850-575‐9621"
            phone="(850) 575‐9621"
          />
          <ResourceItem
            resource="bond-community-health-center"
            title="Bond Community Health Center"
            description="Offers mental health services, primary health care, HIV/AIDS prevention and education, nutritional counseling, dental screening, participation at health fairs/other community events, and referrals."
            webLink="http://www.bondchc.com/"
            addressLink="https://www.google.com/maps/place/Bond+Community+Health+Center+Inc./@30.4252992,-84.280677,17z/data=!4m8!1m2!2m1!1s+1720+South+Gadsden+St!3m4!1s0x88ecf55d65bc3a03:0xb119fde3abc73ab2!8m2!3d30.4253402!4d-84.278648"
            address="1720 S Gadsden St, Tallahassee, FL 32301"
            phoneLink="tel:850-576‐4073"
            phone="(850) 576‐4073"
          />
          <ResourceItem
            resource="neighborhood-medical-center"
            title="Neighborhood Medical Center (Main location in Lincoln Neighborhood Center)"
            description="Sliding fee scale medical clinic providing primary health care for adults. Medicaid/Medipass accepted. Walk-ins: Mon-Fri 8am-11am, 8am-8pm Tues."
            webLink="https://neighborhoodmedicalcenter.org/"
            addressLink="https://www.google.com/maps/place/438+W+Brevard+St,+Tallahassee,+FL+32301/@30.4502205,-84.2896869,17z/data=!3m1!4b1!4m5!3m4!1s0x88ecf59e3c1d9725:0x9f95e3acdccb3773!8m2!3d30.4502205!4d-84.2874982"
            address="438 W Brevard St Tallahassee, FL 32301"
            phoneLink="tel:850-224‐2469"
            phone="(850) 224‐2469"
          />
          <ResourceItem
            resource="tallahassee-veterans-administration-health-center"
            title="Tallahassee Veterans Administration Health Center"
            description="Primary health, mental health & substance abuse evaluation, counseling, medication, groups, etc. for qualified Veterans. Mon-Fri 8am-4:30pm."
            webLink="https://www.northflorida.va.gov/locations/tallahassee.asp"
            addressLink="https://www.google.com/maps/place/2181+Orange+Ave,+Tallahassee,+FL+32301/@30.4099614,-84.2503181,17z/data=!3m1!4b1!4m5!3m4!1s0x88ec5fdd9dae8da7:0xc8c804c52beb9fc2!8m2!3d30.4099614!4d-84.2481294"
            address="2181 Orange Ave Tallahassee, FL 32301"
            phoneLink="tel:850-878‐0191"
            phone="(850) 878‐0191"
            subtitleTwo="For an emotional crisis (then press 1)"
            phoneLinkTwo="tel:1‐800‐273‐8255"
            phoneTwo="1‐800‐273‐8255"
          />
          <ResourceItem
            resource="leon-county-health-department"
            title="Leon County Health Department"
            description="Screening and treatment for TB, STD, and HIV; school physicals and immunizations. Children’s dental services (5-18 on Medicaid), WIC, Medicaid and social services for pregnant women. Call for appointment Mon-Fri 8am-5pm. Clinic hours are Mon-Thurs 8am-3pm (doctor), 8am-4pm (nurses), and Fri 8am-11am."
            webLink="http://leon.floridahealth.gov/"
            addressLink="https://www.google.com/maps/place/872+W+Orange+Ave,+Tallahassee,+FL+32310/@30.4131241,-84.2989802,17z/data=!3m1!4b1!4m5!3m4!1s0x88ecf530ce33a2d1:0xdf99ebde7aa16b45!8m2!3d30.4131241!4d-84.2967915"
            address="872 W Orange Ave Tallahassee, FL 32310"
            addressLinkTwo="https://www.google.com/maps/place/1515+Old+Bainbridge+Rd,+Tallahassee,+FL+32303/@30.4593059,-84.2974588,17z/data=!3m1!4b1!4m5!3m4!1s0x88ecf5a36bf15647:0x352ff34ba055ed5d!8m2!3d30.4593059!4d-84.2952701"
            addressTwo="1515 Old Bainbridge Rd Tallahassee, FL 32303"
            phoneLink="tel:850-404-6240"
            phone="(850) 404-6240"
            phoneLinkTwo="tel:850-404-6400"
            phoneTwo="(850) 404-6400"
            subtitleOne="Richard-Lewis Health Center"
            subtitleTwo="Main Office - Roberts & Stevens Clinic"
          />
          <ResourceItem
            resource="big-bend-cares"
            title="Big Bend Cares"
            description="Assistance with medical, dental, housing and other needs for people with HIV or AIDS. Free HIV Testing. Monday-Friday 8:00am-5:00pm. Call for an appointment."
            webLink="https://bigbendcares.org/"
            addressLink="https://www.google.com/maps/place/2201+S+Monroe+St,+Tallahassee,+FL+32301/@30.4196702,-84.2824486,17z/data=!3m1!4b1!4m5!3m4!1s0x88ecf55b53d99a1f:0xbb6e91d82b5244f4!8m2!3d30.4196702!4d-84.2802599"
            address="2201 S Monroe St Tallahassee, FL 32301"
            phoneLink="tel:850-656‐2437"
            phone="(850) 656‐2437"
            phoneLinkTwo="tel:1‐800‐815‐8954"
            phoneTwo="1‐800‐815‐8954"
          />
        </div>
      </div>
      {/* Family Services (including Education Services) */}
      <div className="faq-content-row">
        <h2>Family Services (including Education Services)</h2>
        <div className="resource-panel">
          <ResourceItem
            resource="pregnancy-help-and-information-center"
            title="Pregnancy Help and Information Center"
            description="Aid and assistance to women who are pregnant, believe they might be pregnant, or have young children. Mon 1:00pm-8:00pm, Tue 9:00am-6:00pm, Wed-Thur 9:00am-4:00pm, Closed Friday."
            webLink="https://www.phicenter.org/"
            addressLink="https://www.google.com/maps/place/1710+S+Gadsden+St,+Tallahassee,+FL+32301/@30.4257891,-84.2808034,17z/data=!3m1!4b1!4m5!3m4!1s0x88ecf55d62b0e663:0x123b0cf81c923c24!8m2!3d30.4257891!4d-84.2786147"
            address="1710 S Gadsden St Tallahassee, FL 32301"
            phoneLink="tel:850-222-7177"
            phone="(850) 222-7177"
          />
          <ResourceItem
            resource="whole-child-leon"
            title="Whole Child Leon"
            description="Links community services and resources to families with children. Mon-Fri 8:30am-5:00pm"
            webLink="https://www.wholechildleon.org/"
            addressLink=""
            address=""
            phoneLink="tel:850-692‐3134"
            phone="(850) 692‐3134"
          />
          <ResourceItem
            resource="capital-city-youth-services"
            title="Capital City Youth Services"
            description="Outreach and non-residential counseling services to individuals, families, and groups for children between ages 10-17 years. SNAP (Stop Now and Plan), a 13-week counseling group for children ages 6-11 years."
            webLink="https://www.ccys.org/"
            addressLink="https://www.google.com/maps/place/2407+Roberts+Ave,+Tallahassee,+FL+32310/@30.4292199,-84.3278935,17z/data=!3m1!4b1!4m5!3m4!1s0x88ecf4e9c30abcc5:0xc98efb5869cdb249!8m2!3d30.4292199!4d-84.3257048"
            address="2407 Roberts Ave Tallahassee, FL 32310"
            phoneLink="tel:850-576‐6000"
            phone="(850) 576‐6000"
          />
          <ResourceItem
            resource="early-learning-coalition"
            title="Early Learning Coalition"
            description="Services include: subsidized childcare, School Readiness, VPK and a variety of developmental services for children. Mon-Thur 7:00am-6:00pm, Closed Friday."
            webLink="https://www.elcbigbend.org/"
            addressLink="https://www.google.com/maps/place/2639+N+Monroe+St+Bldg.+C-300,+Tallahassee,+FL+32303/@30.4773605,-84.2979346,17z/data=!3m1!4b1!4m5!3m4!1s0x88ecf5c6b3ea305f:0x3f784f263c03de8a!8m2!3d30.4773605!4d-84.2957459"
            address="2639 N Monroe St Bldg. C-300 Tallahassee, FL 32303"
            phoneLink="tel:850-385‐0504"
            phone="(850) 385‐0504"
            subtitleTwo="Childcare resource and referral"
            phoneLinkTwo="tel:866‐973‐9030"
            phoneTwo="(866) 973‐9030"
          />
          <ResourceItem
            resource="kids-incorporated"
            title="Kids, Incorporated"
            description="Primarily serves children 0-3 years old and pregnant women in Jefferson, Leon and Madison counties with supportive services and educarion."
            webLink="https://www.kidsincorporated.org/"
            addressLink="https://www.google.com/maps/place/2326+Centerville+Rd,+Tallahassee,+FL+32308/@30.477641,-84.2416467,17z/data=!3m1!4b1!4m5!3m4!1s0x88ec5f3b3c117b99:0xd2eee274235137f!8m2!3d30.477641!4d-84.239458"
            address="2326 Centerville Rd Tallahassee, FL 32308"
            phoneLink="tel:850-414‐9800"
            phone="(850) 414‐9800"
          />
          <ResourceItem
            resource="oasis-center-for-women-and-girls"
            title="Oasis Center for Women and Girls"
            description=" Provides counseling, single-mother’s group and girl’s circles. Provide counseling for women 18 yrs and older."
            webLink="https://theoasiscenter.net/"
            addressLink="https://www.google.com/maps/place/317+E+Call+St,+Tallahassee,+FL+32301/@30.4433221,-84.2810416,17z/data=!3m1!4b1!4m5!3m4!1s0x88ecf5798968e769:0x7c41a5f6b9980862!8m2!3d30.4433221!4d-84.2788529"
            address="317 E Call St, Tallahassee, FL 32301"
            phoneLink="tel:850-222‐2747"
            phone="(850) 222‐2747"
          />
          <ResourceItem
            resource="women-infants-and-children"
            title="Women Infants and Children (WIC)"
            description="Federally funded nutrition program for women, infants, and children. Any local Health Department."
            webLink="http://www.floridahealth.gov/programs-and-services/wic/"
            addressLink=""
            address=""
            phoneLink="tel:850-404‐6300"
            phone="(850) 404‐6300"
          />
          <ResourceItem
            resource="brehon-institute-for-family-services"
            title="Brehon Institute for Family Services"
            description="Improving the lives of children and their families by providing services that promote healthy babies and prevent child abuse and neglect."
            webLink="http://www.brehonfamilyservices.org/"
            addressLink="https://www.google.com/maps/place/1315+Linda+Ann+Dr,+Tallahassee,+FL+32301/@30.4291498,-84.2469848,17z/data=!3m1!4b1!4m5!3m4!1s0x88ec5fbebc4ffc57:0x12b857525cc8ce7c!8m2!3d30.4291498!4d-84.2447961"
            address="1315 Linda Ann Dr Tallahassee, FL 32301"
            phoneLink="tel:850-656‐7110"
            phone="(850) 656‐7110"
          />
          <ResourceItem
            resource="leon-county-school-board"
            title="Leon County School Board"
            description=" Liaison for children and youth experiencing homelessness to provide assistance with school enrollment, transportation, and support for students pre-k – 12."
            webLink="https://www.leonschools.net/"
            addressLink="https://www.google.com/maps/place/3955+W+Pensacola+St,+Tallahassee,+FL+32304/@30.4385706,-84.3446442,17z/data=!3m1!4b1!4m5!3m4!1s0x88ecf4906ab999fd:0xbce2f8d9a23986e2!8m2!3d30.4385706!4d-84.3424555"
            address="3955 W Pensacola St Tallahassee, FL 32304"
            phoneLink="tel:850-487‐7227"
            phone="(850) 487‐7227"
            subtitleTwo="Fax"
            phoneLinkTwo="fax:8504145146"
            phoneTwo="(850) 414‐5146"
          />
          <ResourceItem
            resource="leon-county-adult-and-community-education"
            title="Leon County Adult and Community Education (ACE)"
            description="GED preparation and testing."
            webLink="https://www.aceleon.org/"
            addressLink="https://www.google.com/maps/place/526+Appleyard+Dr,+Tallahassee,+FL+32304/@30.4495457,-84.3411929,17z/data=!3m1!4b1!4m5!3m4!1s0x88ecf4898e383c43:0x1f3444cbdce2db61!8m2!3d30.4495457!4d-84.3390042"
            address="526 Appleyard Dr Tallahassee, FL 32304"
            phoneLink="tel:850-717‐2020"
            phone="(850) 717‐2020"
          />
        </div>
      </div>
      {/* Social Security Cards and Disability Benefits */}
      <div className="faq-content-row">
        <h2>Social Security Cards + Disability Benefits</h2>
        <div className="resource-panel">
          <ResourceItem
            resource="social-security-administration"
            title="Social Security Administration"
            description="Mon-Tue 9:00am-4:00pm, Wed 9:00am-12:00pm, Thur-Fri 9:00am4:00pm"
            webLink="https://www.ssa.gov/"
            addressLink="https://www.google.com/maps/place/2002+Old+St+Augustine+Rd+Building+B-12,+Tallahassee,+FL+32301/@30.4266563,-84.2484252,17z/data=!3m1!4b1!4m5!3m4!1s0x88ec5fbf07f16bfb:0x9d84b818a32e1092!8m2!3d30.4266563!4d-84.2462365"
            address="2002 Old St Augustine Rd Building B-12 Tallahassee, FL 32301"
            phoneLink="tel:850-866‐248‐2088"
            phone="(850) 866‐248‐2088"
            subtitleOne="Tallahassee Office"
            phoneLinkTwo="tel:850-772‐1213"
            phoneTwo="(800) 772‐1213"
          />
          <ResourceItem
            resource="ability-first-benefits"
            title="Ability1st"
            description=" Supportive services and assistance with obtaining benefits, peer counseling, housing, and more. Services are for any person living with a disability."
            webLink="https://www.ability1st.info/"
            addressLink="https://www.google.com/maps/place/1823+Buford+Ct,+Tallahassee,+FL+32308/@30.4738085,-84.2329206,17z/data=!3m1!4b1!4m5!3m4!1s0x88ec5f211f1b72eb:0x7e1b690e8173b0e1!8m2!3d30.4738085!4d-84.2307319"
            address="1823 Buford Ct Tallahassee, FL 32308"
            phoneLink="tel:850-575‐9621"
            phone="(850) 575‐9621"
          />
          <ResourceItem
            resource="kearney-center-for-comprehensive-emergency-services"
            title="Kearney Center for Comprehensive Emergency Services"
            description="Social Security Disability Applications for homeless individuals."
            webLink="https://kearneycenter.org/home/"
            addressLink="https://www.google.com/maps/place/2650+Municipal+Way,+Tallahassee,+FL+32304/@30.440412,-84.3333034,17z/data=!3m1!4b1!4m5!3m4!1s0x88ecf4f28f3a91b9:0x3dc2de83d143d8cf!8m2!3d30.440412!4d-84.3311147"
            address="2650 Municipal Way Tallahassee, FL 32304"
            phoneLink="tel:850-792‐9000"
            phone="(850) 792‐9000"
          />
        </div>
      </div>
      {/* Transportation + Identification */}
      <div className="faq-content-row">
        <h2>Transportation + Identification</h2>
        <div className="resource-panel">
          <ResourceItem
            resource="star-metro"
            title="StarMetro"
            description="Monthly bus passes for low-income people looking for work (once only) or with two medical appointments per month. Must have ID and income verification to qualify. Apply at 555 Appleyard Dr. (also available through many local social service agencies)."
            webLink="https://www.talgov.com/starmetro/starmetroHome.aspx"
            addressLink=""
            address=""
            phoneLink="tel:850-891‐5200"
            phone="(850) 891‐5200"
          />
          <ResourceItem
            resource="kearney-center-for-comprehensive-emergency-services-transportation"
            title="Kearney Center for Comprehensive Emergency Services"
            description=" StarMetro passes are available with a referral from case management staff. Help with one-way Greyhound bus tickets funding provided by Trinity United Methodist Church Travelers Assistance Program"
            webLink="https://kearneycenter.org/home/"
            addressLink=""
            address=""
            phoneLink=""
            phone=""
          />
          <ResourceItem
            resource="echo-emergency-resources-program"
            title="ECHO Emergency Resources Program"
            description="Bus passes, goods and services to those needing a helping hand to survive and turn their lives around. Must be referred by a case manager."
            webLink="https://echotlh.org/"
            addressLink="https://www.google.com/maps/place/1701+S+Gadsden+St,+Tallahassee,+FL+32301/@30.4260667,-84.2801005,17z/data=!3m1!4b1!4m8!1m2!2m1!1sr.+1701+S.+Gadsden+St.!3m4!1s0x88ecf55d0b81e723:0xdf57c848da66ecf5!8m2!3d30.4260667!4d-84.2779118"
            address="1701 S Gadsden St Tallahassee, FL 32301"
            phoneLink="tel:850-224‐3246"
            phone="(850) 224‐3246"
          />
          <ResourceItem
            resource="florida-licensing-on-wheels"
            title="Florida Licensing on Wheels (Flow Mobile)"
            description="Mobile service for first time licenses, renewals, replacements, ID Cards, etc. Visits the Kearney Center for Comprehensive Emergency Services every first Wednesday of the Month."
            webLink="https://www.flhsmv.gov/locations/florida-licensing-wheels-flow/"
            addressLink="https://www.google.com/maps/place/2650+Municipal+Way,+Tallahassee,+FL+32304/@30.440412,-84.3333034,17z/data=!3m1!4b1!4m5!3m4!1s0x88ecf4f28f3a91b9:0x3dc2de83d143d8cf!8m2!3d30.440412!4d-84.3311147"
            address="2650 Municipal Way Tallahassee, FL 32304"
            phoneLink="tel:850-792‐9000"
            phone="(850) 792‐9000"
          />
        </div>
      </div>
      {/* Substance Abuse Services */}
      <div className="faq-content-row">
        <h2>Substance Abuse Services</h2>
        <div className="resource-panel">
          <ResourceItem
            resource="apalachee-center-inc-substance"
            title="Apalachee Center, Inc"
            description=" 24 hour detox/crisis intervention services."
            webLink="https://apalacheecenter.org/primary-care-detox/"
            addressLink="https://www.google.com/maps/place/2634+Capital+Cir+NE,+Tallahassee,+FL+32308/@30.4869598,-84.2422429,17z/data=!3m1!4b1!4m5!3m4!1s0x88ec5f31885a724d:0xca0c4f843e372fcb!8m2!3d30.4869598!4d-84.2400542"
            address="2634 Capital Cir NE Tallahassee, FL 32308"
            phoneLink="tel:850-523‐3333"
            phone="(850) 523‐3333"
          />
          <ResourceItem
            resource="disc-village"
            title="DISC Village"
            description="Outpatient treatment for men, women, and teenagers; inpatient treatment for women and teenagers only."
            webLink="https://discvillage.com/"
            addressLink="https://www.google.com/maps/place/1000+W+Tharpe+St+STE+14,+Tallahassee,+FL+32303/@30.4649854,-84.3017832,17z/data=!3m1!4b1!4m5!3m4!1s0x88ecf5ba4f799035:0x1e459571233b6326!8m2!3d30.4649854!4d-84.2995945"
            address="1000 W Tharpe St STE 14 Tallahassee, FL 32303"
            phoneLink="tel:850-561‐0717"
            phone="(850) 561‐0717"
          />
          <ResourceItem
            resource="disc-village-adult-residential"
            title="DISC Village Adult Residential"
            description="Residential treatment program for women seeking to maintain sobriety. M-F 8am-5pm"
            webLink="https://discvillage.com/services/adult-services"
            addressLink=""
            address=""
            phoneLink="tel:850-421‐4115"
            phone="(850) 421‐4115"
          />
          <ResourceItem
            resource="townsend-arc-addition-recovery-center"
            title="Townsend ARC (Addiction Recovery Center)"
            description="Substance abuse and mental health services, including individual counseling, DUI counseling, and probation services."
            webLink="http://www.townsendarc.com/"
            addressLink="https://www.google.com/maps/place/2724+Capital+Cir+NE+%238,+Tallahassee,+FL+32308/@30.4879616,-84.2422931,17z/data=!3m1!4b1!4m5!3m4!1s0x88ec5f3224b09ca3:0x5c10681ade767f47!8m2!3d30.4879616!4d-84.2401044"
            address="2724 Capital Cir NE #8 Tallahassee, FL 32308"
            phoneLink="tel:850-656‐5112"
            phone="(850) 656‐5112"
            subtitleTwo="Fax"
            phoneLinkTwo="fax:8506563802"
            phoneTwo="(850) 656‐3802"
          />
          <ResourceItem
            resource="a-life-recovery"
            title="A Life Recovery"
            description="Day, residential, inpatient services for men & women."
            webLink="https://www.freerehabcenters.org/details/a-life-recovery-center-inc"
            addressLink=""
            address=""
            phoneLink="tel:850-224‐9991"
            phone="(850) 224‐9991"
          />
          <ResourceItem
            resource="woodlands-camp"
            title="Woodlands C.A.M.P. (Compulsive Addiction Mending Program)"
            description=" A Christ-centered program for adult males, eighteen years old or older."
            webLink="http://www.woodlands-camp-tally.org/"
            addressLink=""
            address=""
            phoneLink="tel:850‐574‐2267"
            phone="(850) 574‐2267"
          />
          <ResourceItem
            resource="teen-challenge-tallahassee-mens-center"
            title="Teen Challenge, Tallahassee Men’s Center"
            description=" Christian based men's residential recovery program for substance abuse and other issues."
            webLink="https://tallahasseemensrehab.com/"
            addressLink="https://www.google.com/maps/place/4141+Apalachee+Pkwy,+Tallahassee,+FL+32311/@30.4280773,-84.1963444,17z/data=!3m1!4b1!4m5!3m4!1s0x88ec5e718653be93:0x6352cc92eb71297a!8m2!3d30.4280773!4d-84.1941557"
            address="4141 Apalachee Pkwy Tallahassee, FL 32311"
            phoneLink="tel:850-385‐8336"
            phone="(850) 385‐8336"
          />
          <ResourceItem
            resource="alcoholics-anonymous"
            title="Alcoholics + Narcotics Anonymous"
            description=""
            webLink="https://intergroup5.org/"
            addressLink=""
            address=""
            subtitleOne="Alcoholics Anonymous"
            phoneLink="tel:850-224‐1818"
            phone="(850) 224‐1818"
            subtitleTwo="Narcotics Anonymous"
            phoneLinkTwo="tel:850-224‐2321"
            phoneTwo="(850) 224‐2321"
          />
          <ResourceItem
            resource="promise-land-ministries"
            title="Promise Land Ministries ‐ Crawfordville (Wakulla Co.)"
            description="Residential treatment program for men and women. Call for screening."
            webLink="https://www.promiselandministries.org/"
            addressLink="https://www.google.com/maps/place/Promise+Land+Ministries+Lighthouse/@30.1193886,-84.3169832,17z/data=!3m1!4b1!4m5!3m4!1s0x88ec81287b71dfcd:0x3e6579812ba76347!8m2!3d30.1193886!4d-84.3147945"
            address="20 Church Rd, Wakulla Springs, FL 32327"
            phoneLink="tel:850-926-3281"
            phone="(850) 926-3281"
          />
          <ResourceItem
            resource="christ-town-ministries"
            title="Christ Town Ministries ‐ Quincy (Gadsden Co.)"
            description="Residential treatment program for men. Call for screening."
            webLink="http://www.christtown.org/"
            addressLink="https://www.google.com/maps/place/2121+E+Jefferson+St,+Tallahassee,+FL+32301/@30.4394528,-84.2816801,17z/data=!3m1!4b1!4m5!3m4!1s0x88ecf57af230ecfb:0x533cca5011081065!8m2!3d30.4394528!4d-84.2794914"
            address="2121 E Jefferson St Tallahassee, FL 32301"
            phoneLink="tel:850-627‐7181"
            phone="(850) 627‐7181"
          />
        </div>
      </div>
    </div>
  );
};

export default ResourceContent;
