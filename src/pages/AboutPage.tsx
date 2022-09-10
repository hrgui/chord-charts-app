import Page from "~/ui/layout/Page";

const AboutPage = () => {
  return (
    <Page title="About">
      <div className="p-4 bg-base-200">
        <h1 className="text-2xl">Chord Charts App</h1>
        This application is an <strong className="text-bold">
          offline
        </strong>{" "}
        application that keeps track of your chord charts. It only works with
        browsers that support IndexedDB.
      </div>
    </Page>
  );
};

export default AboutPage;
