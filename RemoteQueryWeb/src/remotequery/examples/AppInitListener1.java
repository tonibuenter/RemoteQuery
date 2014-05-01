package remotequery.examples;

import java.sql.Connection;
import java.util.logging.Logger;

import javax.servlet.ServletContext;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import org.hsqldb.jdbc.JDBCPool;
import org.remotequery.RemoteQuery.BuiltIns;
import org.remotequery.RemoteQuery.DataSourceEntry;
import org.remotequery.RemoteQuery.IServiceRepository;
import org.remotequery.RemoteQuery.ServiceEntry;
import org.remotequery.RemoteQuery.ServiceRepository;
import org.remotequery.RemoteQuery.Utils;

public class AppInitListener1 implements ServletContextListener {

	private JDBCPool dataSource = null;

	@SuppressWarnings("unused")
	private static final long serialVersionUID = 1L;

	private static Logger logger = Logger.getLogger(AppInitListener1.class
	    .getName());

	static {
		System.out.println("loading " + AppInitListener1.class.getCanonicalName());
	}

	public void contextInitialized(ServletContextEvent event) {
		//
		//
		//

		ServletContext sc = event.getServletContext();
		Connection connection = null;
		try {
			//
			// webInfPath
			//
			String webInfPath = sc.getRealPath("/WEB-INF");
			logger.info("webInfPath:" + webInfPath);

			// init RemoteQuery Parts

			//
			// AppInit-A :: Init default DataSource
			//

			String dbUrl = sc.getInitParameter("dbUrl");
			dbUrl = Utils.isEmpty(dbUrl) ? "jdbc:hsqldb:file:~/RemoteQueryDB;shutdown=true"
			    : dbUrl;
			logger.info("Try to create connection to " + dbUrl);
			dataSource = new JDBCPool();
			dataSource.setDatabase(dbUrl);
			dataSource.setUser("SA");
			dataSource.setPassword("SA");

			// create and set as default dataSource
			new DataSourceEntry(dataSource);

			//
			// AppInit-B :: Init default ServiceRepository
			//

			// create and set as default serviceRepository
			IServiceRepository repo = new ServiceRepository("[]");


			//
			// AppInit-D :: Addl Built-In RegisterService service
			//

			repo.add(new ServiceEntry("RegisterService", "java:"
			    + BuiltIns.RegisterService.class.getName(), ""));

			//
			// AppInit-D :: Init DB and RemoteQueries (only for Development!)
			//

			connection = dataSource.getConnection();

			// create ServiceEntry for the create statements
			String createAddressQuery = "create table ADDRESS ("
			    + "FIRST_NAME varchar(1024), " + "LAST_NAME varchar(1024), "
			    + "STREET varchar(1024), " + "CITY varchar(1024), "
			    + "ZIP varchar(1024), " + "COUNTRY varchar(1024))";
			logger.info("Try to create ADDRESS table ...");
			Utils.runQuery(connection, createAddressQuery);

			//
			//
			//

		} catch (Exception e) {
			logger.severe(e.getLocalizedMessage());
		} finally {
			Utils.closeQuietly(connection);
		}
		logger.info(this.getClass().getName() + " contextInitialized done.");
	}

	public void contextDestroyed(ServletContextEvent sce) {
		try {
			if (dataSource != null) {
				dataSource.close(0);
			}
		} catch (Exception e) {
			logger.severe("DataSource close: " + e.getMessage());
		}
		logger.info(this.getClass().getName() + " contextDestroyed done.");
	}
}

