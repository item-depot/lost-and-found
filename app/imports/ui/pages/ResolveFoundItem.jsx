import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { useParams } from 'react-router';
import React, { useState } from 'react';
import swal from 'sweetalert';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import { FoundItems } from '../../api/item/FoundItems';
import { Profiles } from '../../api/profile/Profile';
import { ResolvedItemsArchive } from '../../api/item/ResolvedItemsArchive';
import FoundItem from '../components/FoundItem';

// note: the url is in the form of "<domainname>/resolvelost/<itemID>/<userIDwhofoundit>
export const ResolveFoundItem = () => {
  const [deletedAndArchived, setDeletedAndArchived] = useState(false);
  const { _id, _userId } = useParams();
  console.log(_id);
  console.log(_userId);

  const { lostItemInfo, userInfo, ready } = useTracker(() => {
    const sub = Meteor.subscribe(FoundItems.userPublicationName);
    const rdy = sub.ready();
    const item = FoundItems.collection.find({ _id: _id }).fetch();
    const user = Profiles.collection.find({ _id: _userId }).fetch();
    return {
      lostItemInfo: item[0],
      userInfo: user[0],
      ready: rdy,
    };
  });

  function handleFound() {
    // eslint-disable-next-line max-len
    ResolvedItemsArchive.collection.insert({ image: 'https://i.fbcd.co/products/resized/resized-750-500/88cf1f6276057b29a27a5b93ebce4c82781839a7d3a6c577e30730ffed9cd2eb.jpg', resolvedBy: userInfo.email, dateResolved: new Date(), itemName: lostItemInfo.itemName, dateReported: lostItemInfo.dateReported }, (err) => {
      if (err) {
        swal(err, 'error');
      } else {
        // eslint-disable-next-line consistent-return
        FoundItems.collection.remove({ _id: _id }, (e) => {
          if (e) {
            swal(e, 'error');
          } else {
            swal('Thank you!', 'Item successfully moved to archive.', 'success');
            setDeletedAndArchived(true);
          }
        });
      }
    });
  }

  if (deletedAndArchived) {
    return <Navigate to="/listfound" />;
  }

  // eslint-disable-next-line no-nested-ternary
  return (ready ? (
    (lostItemInfo && userInfo ? (
      <Container>
        <Row>
          <Col md={1} />
          <Col md={6}>
            <br />
            <div style={{ width: '80%', height: '2vh', backgroundColor: 'seagreen' }} />
            <br />
            <h3 style={{ color: 'white' }}>Please confirm if the following item has been claimed by someone.</h3>
            <p style={{ color: 'white' }}>This will help us clear the site of found/claimed/resolved items.</p>
            <Button variant="success" onClick={() => handleFound()}>Yes, this item has been claimed</Button>
            <br /><br />
            <Button variant="danger">No, this item was not claimed.</Button>
          </Col>
          <Col md={4}>
            <FoundItem item={lostItemInfo} canTakeAction={false} />
          </Col>
          <Col md={1} />
        </Row>
      </Container>
    ) : (
      <>
        <h1 style={{ color: 'white', textAlign: 'center' }}>Hmm... it seems like this item has been resolved already.</h1>
        <h4 style={{ color: 'white', textAlign: 'center' }}>Appreciate you checking, though!</h4>
      </>
    ))
  ) : <h1>Please wait...</h1>);
};