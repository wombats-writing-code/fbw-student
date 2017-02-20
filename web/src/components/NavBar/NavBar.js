import React, {Component} from 'react'
import { IndexLink, Link, browserHistory } from 'react-router'
import './NavBar.scss'

import {getD2LDisplayName} from 'fbw-platform-common/selectors/login'

class NavBar extends Component {

  render() {
    let props = this.props;
    let breadcrumbs = this._getPath(this.props);

    if (!props.user) {
      return null;
    }

    console.log('props in NavBar', props)

    return (
      <div className="nav-bar flex-container align-center space-between">
        <a href="/"><img className="nav-bar__logo" src={require('fbw-platform-common/assets/logo-site--inverted.png')}/></a>
        <ul className="breadcrumbs">
          {_.map(breadcrumbs, (crumb, idx) => {
            return (
              <li className="breadcrumb" key={`breadcrumbs_${idx}`}>
                <Link to={crumb.path} className={idx === breadcrumbs.length - 1 ? "breadcrumb__link is-inactive" : "breadcrumb__link"}>
                  {crumb.name}
                </Link>
              </li>
            )
          })}
        </ul>

        {/* <p className="route-title">{this._getTitle(props)}</p> */}

        <p className="username">
          {getD2LDisplayName(props.user)}
        </p>
        <button className="logout-button" tabIndex="1" onClick={this._logout}>
          Logout
        </button>

      </div>
    )
  }

  _getPath(props) {
    let breadcrumbs = [{
      path: '/', name: 'Home'
    }];

    switch(props.route.path) {
      case 'subjects':
        breadcrumbs.push({
          path: '/subjects',
          name: 'Subjects'
        });
        break;

      case 'missions':
        if (props.isVisitor) {
          breadcrumbs.push({
            path: '/subjects',
            name: 'Subjects'
          });
        }

        breadcrumbs = _.concat(breadcrumbs, {
          path: '/missions',
          name: 'Missions'
        });

        break;

      case '/missions/:missionName':
        if (props.isVisitor) {
          breadcrumbs.push({
            path: '/subjects',
            name: 'Subjects'
          });
        }

        breadcrumbs = _.concat(breadcrumbs, {
          path: '/missions',
          name: 'Missions'
        }, {
          path: props.route.path,
          name: props.routeParams.missionName
        });
        break;
    }


    return breadcrumbs;
  }

  _getTitle(props) {
    if (props.routeParams) {
      let key = _.keys(props.routeParams)[0];
      return props.routeParams[key];
    }
  }

  _logout = () => {
    browserHistory.push('/logout-success')
    this.props.logout();
  }

}



export default NavBar
