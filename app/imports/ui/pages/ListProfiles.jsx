import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row, Table } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import LoadingSpinner from '../components/LoadingSpinner';
import { Profiles } from '../../api/profile/Profile';
import UserPointsItem from '../components/UserPointsItem';

/* Renders a table containing all of the Profile documents to display point leaderboard. Use <UserPointsItem> to render each row. */
const ListProfiles = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, profiles } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Profiles documents.
    const subscription = Meteor.subscribe(Profiles.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Profile documents
    const profileItems = Profiles.collection.find({}, { sort: { points: -1 } }).fetch();
    return {
      profiles: profileItems,
      ready: rdy,
    };
  }, []);
  return (ready ? (
    <Container className="py-3" style={{ marginBottom: '100px', marginTop: '50px' }}>
      <Row className="justify-content-center leaderboard-container">
        <Col>
          <Col className="text-center leaderboard-heading">
            <h2>Leaderboards</h2>
          </Col>
          <Table striped bordered hover className="leaderboard-table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Name</th>
                <th>Total Points</th>
              </tr>
            </thead>
            <tbody>
              {profiles.map((user, index) => <UserPointsItem key={user._id} user={user} rank={index + 1} />)}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default ListProfiles;
