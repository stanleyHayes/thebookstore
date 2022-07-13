import yamoah from "./../assets/images/yamoah.jpg";
import achaako from "./../assets/images/achaako.jpg";
import mugisha from "./../assets/images/mugishajpg.jpg";
import coulibaly from "./../assets/images/coulibaly.jpg";
import mukarakate from "./../assets/images/mukarakate.jpeg";
import ebere from "./../assets/images/ebere.jpg";
import antoinette from "./../assets/images/antoinette.jpg";
import karamoa from "./../assets/images/karamoa.jpg";

import share from "./../assets/images/share.png";
import languages from "./../assets/images/languages.png";
import categories from "./../assets/images/categories.png";
import trailers from "./../assets/images/trailers.png";
import interactions from "./../assets/images/interactions.png";

const TEAM = [
    {
        _id: 1,
        image: yamoah,
        name: 'Mr. Michael Yamoah',
        role: 'Project Mentor',
        description: 'Mr. Michael Yamoah, a lecturer at Academic city university college, a writer, and a blogger, who loves to read and write is our mentor because of these character traits he has and loves encouraging a spirit of reading in the youth.'
    },
    {
        _id: 2,
        image:achaako,
        name: 'Christiana Achaako',
        role: 'Facilitator',
        description: 'Christiana Achaako, a Mechanical Engineering student, is the facilitator of The Deux+five and is responsible for arranging and facilitating team meetings, establishing an action plan, making sure tasks are delegated clearly and appropriately and completed in time, and encouraging the team in the Deux+five vision.'
    },
    {
        _id: 3,
        image: mugisha,
        name: 'Richard Mugisha',
        role: 'Full Stack Developer',
        description: 'Richard Mugisha, a Computer Engineering student, deals with website management, performance, and stability.'
    },
    {
        _id: 4,
        image: coulibaly,
        name: 'Mohamed Coulibaly',
        role: 'Full Stack Developer',
        description: 'Mohamed Coulibaly, FULL STACK web developer takes part in the development of the website to ensure the well-being of the project, and takes care of the good development of the website, in the the Deux+five group, being flexible and knowing how to communicate is a must, with  Deux+five creativity is welcome.'
    },
    {
        _id: 5,
        image: mukarakate,
        name: 'Daisy Mukarakate',
        role: 'Data Analytics Manager',
        description: 'Daisy Mukarakate, a Mechanical Engineering student, deals with the Collection of data from reviews and feedback from the users and processes it so that it will be useful to the production team, marketing department, Research team, and Web development team.'
    },
    {
        _id: 6,
        image: ebere,
        name: 'Princess Ebere',
        role: 'Marketing Partner',
        description: 'Princess Ebere, a Marketing student, plays a vital role in promoting the business and mission of this organization, and serves as the face of The Deux+five company, coordinating and producing all materials representing our business, reaches out to prospects, customers, investors, and/or the community while creating an overarching image that represents your company in a positive light.'
    },
    {
        _id: 7,
        image: antoinette,
        name: 'Antoinette Dewortor',
        role: 'Marketing Partner',
        description: 'Antoinette Dewortor, a Marketing student, plays a vital role in promoting the business and mission of this organization, and serves as the face of The Deux+five company, coordinating and producing all materials representing our business, reaches out to prospects, customers, investors, and/or the community while creating an overarching image that represents your company in a positive light.'
    },
    {
        _id: 8,
        image: karamoa,
        name: 'Melody Koramoa',
        role: 'Researcher',
        description: 'Melody Koramoa, a computer science student, and researcher of the Deux+five, responsible for aligning methodologies with research goals, using a range of tools to acquire information and interpret data. I\'m also responsible for writing up reports and presenting findings and schedules to management and notifications stakeholders, identifying trends and patterns, and conducting fieldwork and tests for various books making it interesting for our users to read on our website.'
    },
];

const FEATURES = [
    {
        name: 'Languages',
        description: 'Get your latest books in your favorite languages',
        image: languages
    },
    {
        name: 'Categories',
        description: 'Get books in all categories from Sci-Fi to Documentaries',
        image: categories
    },
    {
        name: 'Trailers',
        description: 'Peek into your favorite books by watching the video trailer',
        image: trailers
    },
    {
        name: 'Interactions',
        description: 'Like, comment and rate your favorite trailers',
        image: interactions
    },
    {
        name: 'Share',
        description: 'Share your great works for a farther reach',
        image: share
    }
]
export const THE_BOOK_STORE_DATA = {FEATURES, TEAM};
