import { useContext, useState } from "react";
import { Box, Grid, Button } from "@mui/material";
import { StyledTypography } from "../../utils/styledComponents";
import PortfolioItem from "../../components/portfolio-item/portfolio-item.component";

import { ProjectDataContext } from "../../context/project-data.component";

const Portfolio = ({ checks }) => {
  const { projectsData, technologyIcons } = useContext(ProjectDataContext);
  const { isMobile } = checks;

  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 6;

  // Calculate the indices of the first and last projects on the current page
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;

  // Slice the projectsData array to get only the projects for the current page
  const currentProjects = projectsData
    .sort((a, b) => a.id - b.id)
    .slice(indexOfFirstProject, indexOfLastProject);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  return (
    <Box component={Grid} item xs={12} sm={12} md={12} lg={10} xl={8}>
      <StyledTypography
        variant={isMobile ? "h3" : "h2"}
        sx={{ textAlign: "center", marginBottom: "20px" }}
      >
        Portfolio
      </StyledTypography>
      <Grid container spacing={4}>
        {currentProjects.map((project) => (
          <Grid item xs={12} md={6} lg={4} key={project.id}>
            <PortfolioItem
              project={project}
              checks={checks}
              technologyIcons={technologyIcons}
            />
          </Grid>
        ))}
      </Grid>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "20px",
        }}
      >
        <Button
          variant="contained"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <Button
          variant="contained"
          onClick={handleNextPage}
          disabled={indexOfLastProject >= projectsData.length}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default Portfolio;
