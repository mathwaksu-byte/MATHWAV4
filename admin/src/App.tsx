import { Admin, Resource, ShowGuesser, CustomRoutes, Layout } from 'react-admin';
import { authProvider } from './authProvider';
import { Dashboard } from './Dashboard';
import SchoolIcon from '@mui/icons-material/School';
import AssignmentIcon from '@mui/icons-material/Assignment';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import ArticleIcon from '@mui/icons-material/Article';
import LinkIcon from '@mui/icons-material/Link';
import RateReviewIcon from '@mui/icons-material/RateReview';
import SettingsIcon from '@mui/icons-material/Settings';
import { Route, Navigate } from 'react-router-dom';
import FeesEditor from './pages/FeesEditor';
import GalleryManager from './pages/GalleryManager';
import DisplayPictures from './pages/DisplayPictures';
import SiteSettingsMedia from './pages/SiteSettingsMedia';
import MyMenu from './MyMenu';
import dataProvider from './dataProvider';
import LoginPage from './LoginPage';
import { useState, useRef } from 'react';
import axios from 'axios';


const MyLayout = (props: any) => <Layout {...props} menu={MyMenu} />;

import { List, Datagrid, TextField, BooleanField, DateField, NumberField, Create, Edit, SimpleForm, TextInput, BooleanInput, Toolbar, SaveButton, DeleteButton, SelectInput, ArrayInput, SimpleFormIterator, useInput, NumberInput, DateInput } from 'react-admin';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

const LogoUploadInput = ({ source, label = 'Brand Logo', folder = 'site/logo', accept = 'image/png,image/jpeg,image/svg+xml', buttonText = 'Upload Logo' }: any) => {
  const { field } = useInput({ source });
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const fileUrl = String(field.value || '');

  const authHeader = () => {
    const t = localStorage.getItem('token');
    return t ? { Authorization: `Bearer ${t}` } : {};
  };

  const uploadFile = async (file: File) => {
    const fd = new FormData();
    fd.append('file', file);
    fd.append('bucket', 'uploads');
    fd.append('folder', folder);
    const res = await axios.post(`${API_URL}/uploads/single`, fd);
    return res.data?.file?.url as string;
  };

  const deleteFile = async (urlStr: string) => {
    if (!urlStr) return;
    const url = new URL(urlStr);
    const decodedPath = decodeURIComponent(url.pathname);
    const match = decodedPath.match(/\/storage\/v1\/object\/public\/(.*?)\/(.*)$/);
    if (!match) throw new Error('Could not extract bucket/path from URL');
    const bucket = match[1];
    const path = match[2];
    await axios.delete(`${API_URL}/uploads`, {
      data: { bucket, path },
      headers: authHeader()
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    try {
      if (fileUrl) await deleteFile(fileUrl);
      
      const newUrl = await uploadFile(file);
      field.onChange(newUrl);
    } catch (error) {
      console.error('Failed to upload file:', error);
    } finally {
      setLoading(false);
    }
  };

  const removeLogo = async () => {
    if (!fileUrl) return;
    
    setLoading(true);
    try {
      await deleteFile(fileUrl);
      field.onChange('');
    } catch (error) {
      console.error('Failed to remove file:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{ display: 'block', marginBottom: 8 }}>{label}</label>
      {fileUrl ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: 12, backgroundColor: '#f8fafc', borderRadius: 4 }}>
          <img src={fileUrl} alt="Current file" style={{ width: 60, height: 60, objectFit: 'contain' }} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, color: '#666' }}>Current</div>
            <div style={{ fontSize: 12, color: '#999', marginTop: 4 }}>{fileUrl.split('/').pop()}</div>
          </div>
          <button
            type="button"
            onClick={removeLogo}
            disabled={loading}
            style={{ 
              padding: '6px 12px', 
              fontSize: 12, 
              backgroundColor: '#ef4444', 
              color: 'white', 
              border: 'none', 
              borderRadius: 4, 
              cursor: 'pointer',
              opacity: loading ? 0.6 : 1
            }}
          >
            {loading ? 'Removing...' : 'Remove'}
          </button>
        </div>
      ) : (
        <div style={{ padding: 16, backgroundColor: '#f8fafc', borderRadius: 4, border: '2px dashed #ddd' }}>
          <input
            ref={fileInputRef}
            type="file"
            accept={accept}
            onChange={handleFileChange}
            disabled={loading}
            style={{ display: 'none' }}
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={loading}
            style={{
              padding: '8px 16px',
              backgroundColor: '#1976d2',
              color: 'white',
              border: 'none',
              borderRadius: 4,
              cursor: 'pointer',
              opacity: loading ? 0.6 : 1
            }}
          >
            {loading ? 'Uploading...' : buttonText}
          </button>
          <span style={{ marginLeft: 12, fontSize: 14, color: '#666' }}>
            PNG, JPEG, WEBP, or SVG
          </span>
        </div>
      )}
      <input type="hidden" name={source} value={fileUrl} />
    </div>
  );
};

const UniversitiesList = () => (
  <List perPage={25} resource="universities" empty={<div style={{ padding: 16 }}>No records</div>}>
    <Datagrid rowClick="edit">
      <TextField source="name" />
      <TextField source="slug" />
      <BooleanField source="active" />
      <DateField source="created_at" />
    </Datagrid>
  </List>
);

const ApplicationsList = () => (
  <List perPage={25} resource="applications" empty={<div style={{ padding: 16 }}>No records</div>}>
    <Datagrid rowClick="show">
      <TextField source="name" />
      <TextField source="email" />
      <TextField source="phone" />
      <TextField source="city" />
      <BooleanField source="neet_qualified" />
      <NumberField source="preferred_year" />
      <TextField source="status" />
      <DateField source="created_at" />
    </Datagrid>
  </List>
);

const TestimonialsList = () => (
  <List perPage={25} resource="testimonials" empty={<div style={{ padding: 16 }}>No records</div>}>
    <Datagrid rowClick="edit">
      <TextField source="name" />
      <TextField source="quote" />
      <BooleanField source="active" />
      <DateField source="created_at" />
    </Datagrid>
  </List>
);

const FaqsList = () => (
  <List perPage={25} resource="faqs" empty={<div style={{ padding: 16 }}>No records</div>}>
    <Datagrid rowClick="edit">
      <TextField source="question" />
      <BooleanField source="active" />
      <DateField source="created_at" />
    </Datagrid>
  </List>
);

const BlogsList = () => (
  <List perPage={25} resource="blogs" empty={<div style={{ padding: 16 }}>No records</div>}>
    <Datagrid rowClick="edit">
      <TextField source="title" />
      <TextField source="slug" />
      <TextField source="category" />
      <BooleanField source="active" />
      <DateField source="created_at" />
      <DateField source="published_at" />
    </Datagrid>
  </List>
);

const UniversitiesCreate = () => (
  <Create>
    <SimpleForm toolbar={<Toolbar><SaveButton /></Toolbar>}>
      <TextInput source="name" required fullWidth />
      <TextInput source="slug" required fullWidth />
      <TextInput source="overview" multiline fullWidth />
      <NumberInput source="duration_years" />
      <ArrayInput source="accreditation" label="Accreditations">
        <SimpleFormIterator>
          <TextInput source="" label="Item" />
        </SimpleFormIterator>
      </ArrayInput>
      <ArrayInput source="intake_months" label="Intake Months">
        <SimpleFormIterator>
          <TextInput source="" label="Month" />
        </SimpleFormIterator>
      </ArrayInput>
      <TextInput source="eligibility" multiline fullWidth />
      <TextInput source="hostel_info" multiline fullWidth />
      <BooleanInput source="active" />
    </SimpleForm>
  </Create>
);

const UniversitiesEdit = () => (
  <Edit>
    <SimpleForm toolbar={<Toolbar><SaveButton /><DeleteButton mutationMode="pessimistic" /></Toolbar>}>
      <TextInput source="name" fullWidth />
      <TextInput source="slug" fullWidth />
      <TextInput source="overview" multiline fullWidth />
      <NumberInput source="duration_years" />
      <ArrayInput source="accreditation" label="Accreditations">
        <SimpleFormIterator>
          <TextInput source="" label="Item" />
        </SimpleFormIterator>
      </ArrayInput>
      <ArrayInput source="intake_months" label="Intake Months">
        <SimpleFormIterator>
          <TextInput source="" label="Month" />
        </SimpleFormIterator>
      </ArrayInput>
      <TextInput source="eligibility" multiline fullWidth />
      <TextInput source="hostel_info" multiline fullWidth />
      <BooleanInput source="active" />
    </SimpleForm>
  </Edit>
);

const ApplicationsEdit = () => (
  <Edit>
    <SimpleForm toolbar={<Toolbar><SaveButton /><DeleteButton mutationMode="pessimistic" /></Toolbar>}>
      <SelectInput source="status" choices={[
        { id: 'pending', name: 'pending' },
        { id: 'reviewing', name: 'reviewing' },
        { id: 'approved', name: 'approved' },
        { id: 'rejected', name: 'rejected' }
      ]} />
      <TextInput source="notes" label="Notes" multiline fullWidth />
    </SimpleForm>
  </Edit>
);

const TestimonialsCreate = () => (
  <Create>
    <SimpleForm toolbar={<Toolbar><SaveButton /></Toolbar>}>
      <TextInput source="name" required fullWidth />
      <TextInput source="quote" required multiline fullWidth />
      <BooleanInput source="active" />
    </SimpleForm>
  </Create>
);

const TestimonialsEdit = () => (
  <Edit>
    <SimpleForm toolbar={<Toolbar><SaveButton /><DeleteButton mutationMode="pessimistic" /></Toolbar>}>
      <TextInput source="name" fullWidth />
      <TextInput source="quote" multiline fullWidth />
      <BooleanInput source="active" />
    </SimpleForm>
  </Edit>
);

const FaqsCreate = () => (
  <Create>
    <SimpleForm toolbar={<Toolbar><SaveButton /></Toolbar>}>
      <TextInput source="question" required fullWidth />
      <TextInput source="answer" required multiline fullWidth />
      <BooleanInput source="active" />
    </SimpleForm>
  </Create>
);

const FaqsEdit = () => (
  <Edit>
    <SimpleForm toolbar={<Toolbar><SaveButton /><DeleteButton mutationMode="pessimistic" /></Toolbar>}>
      <TextInput source="question" fullWidth />
      <TextInput source="answer" multiline fullWidth />
      <BooleanInput source="active" />
    </SimpleForm>
  </Edit>
);

const BlogsCreate = () => (
  <Create>
    <SimpleForm toolbar={<Toolbar><SaveButton /></Toolbar>}>
      <TextInput source="title" required fullWidth />
      <TextInput source="slug" required fullWidth />
      <TextInput source="category" fullWidth />
      <TextInput source="content" multiline fullWidth />
      <TextInput source="excerpt" multiline fullWidth />
      <LogoUploadInput source="og_image_url" label="OG Image" folder="blog/og" accept="image/png,image/jpeg,image/webp" buttonText="Upload OG Image" />
      <DateInput source="published_at" />
      <BooleanInput source="active" />
    </SimpleForm>
  </Create>
);

const BlogsEdit = () => (
  <Edit>
    <SimpleForm toolbar={<Toolbar><SaveButton /><DeleteButton mutationMode="pessimistic" /></Toolbar>}>
      <TextInput source="title" fullWidth />
      <TextInput source="slug" fullWidth />
      <TextInput source="category" fullWidth />
      <TextInput source="content" multiline fullWidth />
      <TextInput source="excerpt" multiline fullWidth />
      <LogoUploadInput source="og_image_url" label="OG Image" folder="blog/og" accept="image/png,image/jpeg,image/webp" buttonText="Upload OG Image" />
      <DateInput source="published_at" />
      <BooleanInput source="active" />
    </SimpleForm>
  </Edit>
);

const SettingsEdit = () => {
  return (
    <Edit>
      <SimpleForm toolbar={<Toolbar><SaveButton /></Toolbar>}>
        <TextInput source="hero_title" fullWidth />
        <TextInput source="hero_subtitle" fullWidth />
        <TextInput source="hero_video_mp4_url" fullWidth />
        <TextInput source="hero_video_webm_url" fullWidth />
        <TextInput source="hero_video_poster_url" fullWidth />
        <TextInput source="background_theme_id" fullWidth />
        <TextInput source="background_gradient_css" multiline fullWidth />
        <LogoUploadInput source="logo_url" label="Brand Logo" folder="site/logo" accept="image/png,image/jpeg,image/svg+xml" buttonText="Upload Logo" />
        <TextInput source="default_title" fullWidth />
        <TextInput source="default_description" multiline fullWidth />
        <LogoUploadInput source="default_og_image_url" label="Default OG Image" folder="site/og" accept="image/png,image/jpeg,image/webp" buttonText="Upload Default OG" />
        <SelectInput source="twitter_card_type" choices={[{ id: 'summary', name: 'summary' }, { id: 'summary_large_image', name: 'summary_large_image' }]} />
      </SimpleForm>
    </Edit>
  );
};

function App() {
  return (
    <Admin
      dataProvider={dataProvider}
      authProvider={authProvider}
      dashboard={Dashboard}
      title="MATHWA Admin"
      layout={MyLayout}
      loginPage={LoginPage}
    >
      <Resource name="universities" icon={SchoolIcon} list={UniversitiesList} create={UniversitiesCreate} edit={UniversitiesEdit} show={ShowGuesser} />
      <Resource name="applications" icon={AssignmentIcon} list={ApplicationsList} edit={ApplicationsEdit} show={ShowGuesser} />
      <Resource name="testimonials" icon={RateReviewIcon} list={TestimonialsList} create={TestimonialsCreate} edit={TestimonialsEdit} />
      <Resource name="faqs" icon={QuestionAnswerIcon} list={FaqsList} create={FaqsCreate} edit={FaqsEdit} />
      <Resource name="blogs" icon={ArticleIcon} list={BlogsList} create={BlogsCreate} edit={BlogsEdit} show={ShowGuesser} />
      <Resource name="backlinks" icon={LinkIcon} list={BacklinksList} create={BacklinksCreate} edit={BacklinksEdit} />
      <Resource name="settings" icon={SettingsIcon} edit={SettingsEdit} />
      <CustomRoutes>
        <Route path="/settings" element={<Navigate to="/settings/default" replace />} />
        <Route path="/fees" element={<FeesEditor />} />
        <Route path="/gallery" element={<GalleryManager />} />
        <Route path="/dp" element={<DisplayPictures />} />
        <Route path="/settings-media" element={<SiteSettingsMedia />} />
      </CustomRoutes>
    </Admin>
  );
}

export default App;
const BacklinksList = () => (
  <List perPage={25} resource="backlinks" empty={<div style={{ padding: 16 }}>No records</div>}>
    <Datagrid rowClick="edit">
      <TextField source="site_name" />
      <TextField source="url" />
      <TextField source="status" />
      <TextField source="contact_email" />
      <DateField source="published_at" />
      <DateField source="created_at" />
    </Datagrid>
  </List>
);

const BacklinksCreate = () => (
  <Create>
    <SimpleForm toolbar={<Toolbar><SaveButton /></Toolbar>}>
      <TextInput source="site_name" required fullWidth />
      <TextInput source="url" required fullWidth />
      <SelectInput source="status" choices={[
        { id: 'prospect', name: 'prospect' },
        { id: 'contacted', name: 'contacted' },
        { id: 'in_progress', name: 'in_progress' },
        { id: 'published', name: 'published' },
        { id: 'rejected', name: 'rejected' }
      ]} />
      <TextInput source="contact_email" fullWidth />
      <TextInput source="notes" multiline fullWidth />
      <DateInput source="published_at" />
    </SimpleForm>
  </Create>
);

const BacklinksEdit = () => (
  <Edit>
    <SimpleForm toolbar={<Toolbar><SaveButton /><DeleteButton mutationMode="pessimistic" /></Toolbar>}>
      <TextInput source="site_name" fullWidth />
      <TextInput source="url" fullWidth />
      <SelectInput source="status" choices={[
        { id: 'prospect', name: 'prospect' },
        { id: 'contacted', name: 'contacted' },
        { id: 'in_progress', name: 'in_progress' },
        { id: 'published', name: 'published' },
        { id: 'rejected', name: 'rejected' }
      ]} />
      <TextInput source="contact_email" fullWidth />
      <TextInput source="notes" multiline fullWidth />
      <DateInput source="published_at" />
    </SimpleForm>
  </Edit>
);
