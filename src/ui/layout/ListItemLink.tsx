import { useAppBarActions } from "~/hooks/useAppBarActions";
import useGetAppBarData from "~/hooks/useGetAppBarData";
import NavLink, { NavLinkProps } from "~/ui/router/NavLink";
import { isMobile } from "utils";

const ListItemLink = ({
  onClick,
  dismissMobileMenu = true,
  ...props
}: NavLinkProps & { dismissMobileMenu?: boolean }) => {
  const { toggleNavMenu } = useAppBarActions();
  const { navMenuHidden } = useGetAppBarData();
  const handleClick = (e) => {
    onClick?.(e);

    //TODO: on mobile navMenuHidden = true is actually shown
    if (dismissMobileMenu && isMobile() && navMenuHidden) {
      toggleNavMenu();
    }
  };

  return (
    <NavLink
      onClick={handleClick}
      activeClassName="bg-base-300"
      className="flex p-2 items-center hover:bg-base-100"
      {...props}
    ></NavLink>
  );
};

export default ListItemLink;
