import { React, useContext } from 'react';
import { auth } from '../firebase/config';
import { useHistory, Link } from 'react-router-dom';
import { AuthContext } from '../context';
import Honey from '../assets/honey.svg';
import '../styles/Layout.css';

const Layout = ({ children }) => {
  const history = useHistory();
  const authContext = useContext(AuthContext);

  const signOut = () => {
    auth.signOut();
    authContext.logout();
    localStorage.removeItem('auth-token');
    history.push('/');
  };

  const drawNavOverviewSection = () => {
    const selected = history.location.pathname === '/overview';
    return (
      <li className="nav-item">
        <Link to="/overview">
          <span className={'nav-link' + (selected ? ' selected' : '')}>
            <svg
              width="43"
              height="38"
              viewBox="0 0 43 38"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.5278 0C13.2957 0 11.4443 1.52148 10.9142 3.57734C10.8545 3.57734 10.8097 3.5625 10.75 3.5625C8.11476 3.5625 5.97222 5.69258 5.97222 8.3125C5.97222 8.66875 6.01701 9.01758 6.09913 9.35156C3.91927 10.2422 2.38889 12.3648 2.38889 14.8438C2.38889 15.7789 2.62778 16.6473 3.00851 17.434C1.21684 18.4582 0 20.3582 0 22.5625C0 25.034 1.52292 27.1566 3.68785 28.0473C3.62066 28.3887 3.58333 28.7375 3.58333 29.0938C3.58333 32.0477 5.98715 34.4375 8.95833 34.4375C9.26441 34.4375 9.56302 34.4004 9.85417 34.3484C10.5708 36.4637 12.5566 38 14.9306 38C17.9017 38 20.3056 35.6102 20.3056 32.6562V4.75C20.3056 2.13008 18.163 0 15.5278 0ZM43 22.5625C43 20.3582 41.7832 18.4582 39.9915 17.434C40.3797 16.6473 40.6111 15.7789 40.6111 14.8438C40.6111 12.3648 39.0807 10.2422 36.9009 9.35156C36.9755 9.01758 37.0278 8.66875 37.0278 8.3125C37.0278 5.69258 34.8852 3.5625 32.25 3.5625C32.1903 3.5625 32.138 3.57734 32.0858 3.57734C31.5557 1.52148 29.7043 0 27.4722 0C24.837 0 22.6944 2.12266 22.6944 4.75V32.6562C22.6944 35.6102 25.0983 38 28.0694 38C30.4434 38 32.4292 36.4637 33.1458 34.3484C33.437 34.4004 33.7356 34.4375 34.0417 34.4375C37.0128 34.4375 39.4167 32.0477 39.4167 29.0938C39.4167 28.7375 39.3793 28.3887 39.3121 28.0473C41.4771 27.1566 43 25.034 43 22.5625Z"
                fill="#ffbf54"
              />
            </svg>

            <span className="link-text">Overview</span>
          </span>
        </Link>
      </li>
    );
  };

  const drawNavFinancialSection = () => {
    const selected = history.location.pathname === '/financial';
    return (
      <li className="nav-item">
        <Link to="/financial">
          <span className={'nav-link' + (selected ? ' selected' : '')}>
            <svg
              width="39"
              height="39"
              viewBox="0 0 39 39"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M35.1305 9.75H6.09375C5.42039 9.75 4.875 9.20461 4.875 8.53125C4.875 7.85789 5.42039 7.3125 6.09375 7.3125H35.3438C36.0171 7.3125 36.5625 6.76711 36.5625 6.09375C36.5625 4.07443 34.9256 2.4375 32.9062 2.4375H4.875C2.18232 2.4375 0 4.61982 0 7.3125V31.6875C0 34.3802 2.18232 36.5625 4.875 36.5625H35.1305C37.2648 36.5625 39 34.9225 39 32.9062V13.4062C39 11.39 37.2648 9.75 35.1305 9.75ZM31.6875 25.5938C30.3415 25.5938 29.25 24.5022 29.25 23.1562C29.25 21.8103 30.3415 20.7188 31.6875 20.7188C33.0335 20.7188 34.125 21.8103 34.125 23.1562C34.125 24.5022 33.0335 25.5938 31.6875 25.5938Z"
                fill="#ffbf54"
              />
            </svg>

            <span className="link-text">Financial</span>
          </span>
        </Link>
      </li>
    );
  };

  const drawNavSalesSection = () => {
    const selected = history.location.pathname === '/sales';
    return (
      <li className="nav-item">
        <Link to="/sales">
          <span className={'nav-link' + (selected ? ' selected' : '')}>
            <svg
              width="48"
              height="42"
              viewBox="0 0 48 42"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M44.01 24.7176L47.9494 7.65507C48.2338 6.42313 47.2826 5.25 45.9992 5.25H13.2673L12.5035 1.57418C12.3132 0.657973 11.4942 0 10.5441 0H2C0.895417 0 0 0.881426 0 1.96875V3.28125C0 4.36857 0.895417 5.25 2 5.25H7.82358L13.6776 33.4224C12.2771 34.2152 11.3333 35.7018 11.3333 37.4062C11.3333 39.9433 13.4227 42 16 42C18.5773 42 20.6667 39.9433 20.6667 37.4062C20.6667 36.1205 20.1294 34.9588 19.2647 34.125H36.7353C35.8706 34.9588 35.3333 36.1205 35.3333 37.4062C35.3333 39.9433 37.4227 42 40 42C42.5773 42 44.6667 39.9433 44.6667 37.4062C44.6667 35.5875 43.5927 34.0157 42.0351 33.2715L42.4948 31.2801C42.7793 30.0481 41.828 28.875 40.5446 28.875H18.1764L17.631 26.25H42.0598C42.9936 26.25 43.8031 25.6139 44.01 24.7176Z"
                fill="#ffbf54"
              />
            </svg>

            <span className="link-text">Sales</span>
          </span>
        </Link>
      </li>
    );
  };

  const drawNavInventorySection = () => {
    const selected = history.location.pathname === '/inventory';
    return (
      <li className="nav-item">
        <Link to="/inventory">
          <span className={'nav-link' + (selected ? ' selected' : '')}>
            <svg
              width="51"
              height="51"
              viewBox="0 0 51 51"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M48.6691 24.9223L39.0469 21.3164V10.5088C39.0469 9.01465 38.1205 7.67989 36.716 7.15196L26.7551 3.4166C25.9482 3.10782 25.0518 3.10782 24.235 3.4166L14.274 7.15196C12.8695 7.67989 11.9432 9.01465 11.9432 10.5088V21.3164L2.3209 24.9223C0.926367 25.4502 0 26.785 0 28.2791V39.2461C0 40.6008 0.766992 41.8459 1.98223 42.4535L11.9432 47.434C12.9492 47.942 14.1445 47.942 15.1506 47.434L25.5 42.2543L35.8494 47.434C36.8555 47.942 38.0508 47.942 39.0568 47.434L49.0178 42.4535C50.233 41.8459 51 40.6008 51 39.2461V28.2791C51 26.785 50.0736 25.4502 48.6691 24.9223ZM35.6602 21.3961L27.1934 24.5736V17.7803L35.6602 14.0947V21.3961ZM15.3398 10.3693L25.5 6.56426L35.6602 10.3693V10.4291L25.5 14.5529L15.3398 10.4291V10.3693ZM23.707 39.3656L15.2402 43.599V35.7199L23.707 31.8551V39.3656ZM23.707 28.2094L13.5469 32.3332L3.38672 28.2094V28.1496L13.5469 24.3445L23.707 28.1496V28.2094ZM47.6133 39.3656L39.1465 43.599V35.7199L47.6133 31.8551V39.3656ZM47.6133 28.2094L37.4531 32.3332L27.293 28.2094V28.1496L37.4531 24.3445L47.6133 28.1496V28.2094Z"
                fill="#ffbf54"
              />
            </svg>

            <span className="link-text">Inventory</span>
          </span>
        </Link>
      </li>
    );
  };

  const drawNavProcurementSection = () => {
    const selected = history.location.pathname === '/procurement';
    return (
      <li className="nav-item">
        <Link to="/procurement">
          <span className={'nav-link' + (selected ? ' selected' : '')}>
            <svg
              width="53"
              height="42"
              viewBox="0 0 53 42"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M51.675 28.875H50.35V20.0074C50.35 18.9656 49.9277 17.9648 49.1823 17.2266L40.9094 9.03164C40.1641 8.29336 39.1538 7.875 38.102 7.875H34.45V3.9375C34.45 1.76367 32.6695 0 30.475 0H3.975C1.78047 0 0 1.76367 0 3.9375V30.1875C0 32.3613 1.78047 34.125 3.975 34.125H5.3C5.3 38.4727 8.86094 42 13.25 42C17.6391 42 21.2 38.4727 21.2 34.125H31.8C31.8 38.4727 35.3609 42 39.75 42C44.1391 42 47.7 38.4727 47.7 34.125H51.675C52.4038 34.125 53 33.5344 53 32.8125V30.1875C53 29.4656 52.4038 28.875 51.675 28.875ZM13.25 38.0625C11.0555 38.0625 9.275 36.2988 9.275 34.125C9.275 31.9512 11.0555 30.1875 13.25 30.1875C15.4445 30.1875 17.225 31.9512 17.225 34.125C17.225 36.2988 15.4445 38.0625 13.25 38.0625ZM39.75 38.0625C37.5555 38.0625 35.775 36.2988 35.775 34.125C35.775 31.9512 37.5555 30.1875 39.75 30.1875C41.9445 30.1875 43.725 31.9512 43.725 34.125C43.725 36.2988 41.9445 38.0625 39.75 38.0625ZM46.375 21H34.45V11.8125H38.102L46.375 20.0074V21Z"
                fill="#ffbf54"
              />
            </svg>

            <span className="link-text">Procurement</span>
          </span>
        </Link>
      </li>
    );
  };

  return (
    <>
      <nav className="navbar">
        <ul className="navbar-nav">
          <li id="logo">
            <img src={Honey} alt="assets logo" />
            <h2 id="title">Bee</h2>
          </li>

          {drawNavOverviewSection()}

          {drawNavFinancialSection()}

          {drawNavSalesSection()}

          {drawNavInventorySection()}

          {drawNavProcurementSection()}

          <li className="nav-item">
            <span onClick={signOut} className="nav-link">
              <Link className="link-text" to="/">
                Logout
              </Link>
            </span>
          </li>
        </ul>
      </nav>
      <main>{children}</main>
    </>
  );
};

export default Layout;
