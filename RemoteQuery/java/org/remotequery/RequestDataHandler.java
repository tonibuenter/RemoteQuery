package org.remotequery;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.util.TreeMap;
import java.util.logging.Logger;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.codec.binary.Base64;
import org.apache.commons.fileupload.FileItemIterator;
import org.apache.commons.fileupload.FileItemStream;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.apache.commons.fileupload.util.Streams;
import org.apache.commons.io.FilenameUtils;
import org.apache.commons.io.IOUtils;
import org.remotequery.RemoteQueryServlet.IRequestDataHandler;
import org.remotequery.RemoteQueryServlet.RequestData;
import org.remotequery.RemoteQueryServlet.WebConstants;

/**
 * This class is a base class which can be used for uploading files. You can
 * create a subclass an provide IUploadFileHandler for the protected field
 * uploadFileHandler.
 * The RemoteQueryServlet is using the IUploadFileHandler class defined by the init parameter
 * 'requestDataHandler'.
 * 
 * @author tonibuenter
 * 
 */
public class RequestDataHandler implements IRequestDataHandler {

	private static Logger logger = Logger.getLogger(RequestDataHandler.class
	    .getName());

	/**
	 * 
	 */
	protected IUploadFileHandler uploadFileHandler = null;

	public RequestData process(HttpServletRequest httpRequest) throws Exception {

		boolean isMultipart = ServletFileUpload.isMultipartContent(httpRequest);
		RequestData requestData = new RequestData();
		if (isMultipart) {
			//
			// multi part processing
			//
			TreeMap<String, String> files = new TreeMap<String, String>();

			// Create a new file upload handler
			ServletFileUpload upload = new ServletFileUpload();

			// Parse the request
			FileItemIterator iter = upload.getItemIterator(httpRequest);
			while (iter.hasNext()) {
				FileItemStream item = iter.next();
				String name = item.getFieldName();
				InputStream stream = item.openStream();
				if (item.isFormField()) {
					String value = Streams.asString(stream, RemoteQuery.ENCODING);
					if (name.startsWith(WebConstants.dataurl_)) {
						//
						// check for dataUrl, see also :
						// http://en.wikipedia.org/wiki/Data_URI_scheme
						//
						String fileName = name.substring(WebConstants.dataurl_.length());

						byte[] docu = dataUrl2Binary(value);
						InputStream stream2 = new ByteArrayInputStream(docu);
						String fileIdentificator = uploadFileHandler.processFile(fileName,
						    stream2);
						files.put(name, fileIdentificator);
						IOUtils.closeQuietly(stream2);
					} else {

						logger.fine("Form field " + name + " with value " + value
						    + " detected.");
						int len = value != null ? value.length() : 0;
						if (len > WebConstants.MAX_FIELD_LENGTH) {
							logger.warning("Field value for " + name
							    + " is to long. It is removed!");
						} else {
							requestData.add(name, value);
						}
					}
				} else {
					String fileName = FilenameUtils.getName(item.getName());
					if (fileName != null) {
						String fileIdentificator = uploadFileHandler.processFile(fileName,
						    stream);
						files.put(name, fileIdentificator);
					}
				}
			}
		} else {
			requestData = RemoteQueryServlet.getRequestData(httpRequest);
		}
		return requestData;
	}

	public static byte[] dataUrl2Binary(String dataUrl) {
		String _base64 = ";base64,";
		int startPosition = dataUrl.indexOf(";base64,");
		if (startPosition == -1) {
			logger.severe("data url missing");
			return null;
		}
		startPosition += _base64.length();
		String s = dataUrl.substring(startPosition);
		return Base64.decodeBase64(s);
	}

	interface IUploadFileHandler {
		String processFile(String fileName, InputStream stream);
	}
}