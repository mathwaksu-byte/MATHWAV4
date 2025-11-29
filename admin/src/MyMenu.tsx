import { Menu, MenuItemLink } from 'react-admin';
import SettingsIcon from '@mui/icons-material/Settings';
import SchoolIcon from '@mui/icons-material/School';

export default function MyMenu() {
  return (
    <Menu>
      <MenuItemLink to="/" primaryText="Dashboard" leftIcon={<SchoolIcon />} />
      <MenuItemLink to="/universities" primaryText="Universities" leftIcon={<SchoolIcon />} />
      <MenuItemLink to="/applications" primaryText="Applications" leftIcon={<SchoolIcon />} />
      <MenuItemLink to="/testimonials" primaryText="Testimonials" leftIcon={<SchoolIcon />} />
      <MenuItemLink to="/faqs" primaryText="Faqs" leftIcon={<SchoolIcon />} />
      <MenuItemLink to="/blogs" primaryText="Blogs" leftIcon={<SchoolIcon />} />
      <MenuItemLink to="/settings/default" primaryText="Site Settings" leftIcon={<SettingsIcon />} />
      <MenuItemLink to="/settings-media" primaryText="Hero Media" leftIcon={<SettingsIcon />} />
    </Menu>
  );
}
