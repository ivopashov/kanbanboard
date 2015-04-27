namespace Board.Web.Logging
{
    public interface ILogger
    {
        void Info(string message);
        void Error(string message);
        void Fatal(string message);
    }
}