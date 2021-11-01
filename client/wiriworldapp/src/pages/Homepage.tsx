import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar,IonItem,IonImg, IonTabBar, IonTabButton, IonIcon, IonTabs } from '@ionic/react';
import './Homepage.css';
import IMAGES from './Images';
import Add from '../components/Add';
import { IonReactRouter } from '@ionic/react-router';
import { homeOutline, personOutline, settingsOutline } from 'ionicons/icons';

const Homepage: React.FC = () => {
  return (
    <IonPage className="page-content">
      <IonHeader>
        <IonToolbar className="Top-bar">
        <IonItem className="Main-logo">
            <IonImg src={IMAGES.mainLogo} className="logo-image"/>
            <IonTitle>WiriWorld</IonTitle>
          </IonItem>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <Add/>
        
      </IonContent>
      <IonReactRouter>
        <IonTabs>
        <IonTabBar slot="bottom" className="Nav-bar">
          <IonTabButton tab="home">
            <IonIcon icon={homeOutline}/>
          </IonTabButton>
          <IonTabButton tab="profile">
            <IonIcon icon={personOutline}/>
          </IonTabButton>
          <IonTabButton tab="settings">
            <IonIcon icon={settingsOutline}/>
          </IonTabButton>
        </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonPage>
  );
};

export default Homepage;